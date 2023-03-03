import React, { useCallback, useMemo, KeyboardEventHandler } from 'react';
import isHotkey from 'is-hotkey';
import { Editable, withReact, Slate, useSlate } from 'slate-react';
import { createEditor, Editor, Transforms, Text } from 'slate';
import { withHistory } from 'slate-history';

import { Box } from '@mui/system';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import CodeIcon from '@mui/icons-material/Code';
import LooksOneIcon from '@mui/icons-material/LooksOne';
import LooksTwoIcon from '@mui/icons-material/LooksTwo';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import ToggleButton from '@mui/material/ToggleButton';
import { Divider } from '@mui/material';

import Prism from 'prismjs'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-tsx'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-java'

// import decorateCodeFunc from './utils/CodeBlock'

const ParagraphType = 'paragraph'
const CodeBlockType = 'code-block'
const CodeLineType = 'code-line'

// https://codesandbox.io/s/rich-text-editor-with-slate-and-material-ui-tuhll?file=/src/App.js:266-299

const HOTKEYS = {
    'mod+b': 'bold',
    'mod+i': 'italic',
    'mod+u': 'underline',
    'mod+`': 'code'
};

const pushString = (token, path, start, ranges, tokenType = 'text') => {
    ranges.push({
      prismToken: tokenType,
      anchor: { path, offset: start },
      focus: { path, offset: start + token.length }
    });
    start += token.length;
    return start;
};

const recurseTokenize = (token, path, ranges, start, parentTag) => {
    // Uses the parent's token type if a Token only has a string as its content
    if (typeof token === "string") {
      return pushString(token, path, start, ranges, parentTag);
    }
    if ("content" in token) {
      // Calls recurseTokenize on nested Tokens in content
      for (const subToken of token.content) {
        start = recurseTokenize(subToken, path, ranges, start, token.type);
      }
      return start;
    }
};

const decorateCodeFunc = (editor, [node, path]) => {
    const ranges = [];
    if (!Text.isText(node)) {
      return ranges;
    }
  
    // You can use this to specify a language like in the gif if you add a bit of logic
    let language = "html"; // node.text.split("\n")[0]; uses first line as language
    // let lang_aliases = { html: "markup" };
    // if (language in lang_aliases) {
    //   language = lang_aliases[language];
    // }
    // if (!(language in components.languages)) {
    //   return ranges;
    // }
  
    // If you wanna import dynamically use this line, but beware the massive import (211 KB!!)
    // require(`prismjs/components/prism-${language}`)
    const tokens = Prism.tokenize(node.text, Prism.languages[language]);
  
    let start = 0;
    for (const token of tokens) {
      start = recurseTokenize(token, path, ranges, start);
    }
    return ranges;
  };

const RichEditor = ({ value, setValue }) => {

    const editor = useMemo(() => withHistory(withReact(createEditor())), []);

    const renderElement = useCallback(props => <Element {...props} />, []);

    const renderLeaf = useCallback(props => <Leaf {...props} />, []);

    const decorateCode = useCallback(
        // This may be where the performance issues come from
        (props) => decorateCodeFunc(editor, props),
        [editor]
      );
    
    return (
        <Box p={1} border={1} borderRadius={1}>
            <Slate
                editor={editor}
                value={value}
                onChange={value => {
                    setValue(value);
                }}
            >
                <Toolbar>
                    <MarkButton format='bold'>
                        <FormatBoldIcon />
                    </MarkButton>
                    <MarkButton format='italic'>
                        <FormatItalicIcon />
                    </MarkButton>
                    <MarkButton format='underline'>
                        <FormatUnderlinedIcon />
                    </MarkButton>
                    <MarkButton format='code'>
                        <CodeIcon />
                    </MarkButton>
                    <BlockButton format='heading-one'>
                        <LooksOneIcon />
                    </BlockButton>
                    <BlockButton format='heading-two'>
                        <LooksTwoIcon />
                    </BlockButton>
                    <BlockButton format='block-quote'>
                        <FormatQuoteIcon />
                    </BlockButton>
                    <BlockButton format='numbered-list'>
                        <FormatListNumberedIcon />
                    </BlockButton>
                    <BlockButton format='bulleted-list'>
                        <FormatListBulletedIcon />
                    </BlockButton>
                </Toolbar>
                <Box pl={1}>
                    <Editable
                        decorate={decorateCode}
                        renderElement={renderElement}
                        renderLeaf={renderLeaf}
                        placeholder='Enter some rich text…'
                        // spellCheck
                        // autoFocus
                        onKeyDown={event => {
                            for (const hotkey in HOTKEYS) {
                                if (isHotkey(hotkey, event)) {
                                    event.preventDefault();
                                    const mark = HOTKEYS[hotkey];
                                    toggleMark(editor, mark);
                                }
                            }
                        }}
                    />
                </Box>
            </Slate>
        </Box>
    );
};

export const Element = ({ props, attributes, children, element }) => {
    switch (element.type) {
        case 'block-quote':
            return <blockquote {...attributes}>{children}</blockquote>;
        case 'bulleted-list':
            return <ul {...attributes}>{children}</ul>;
        case 'heading-one':
            return <h1 {...attributes}>{children}</h1>;
        case 'heading-two':
            return <h2 {...attributes}>{children}</h2>;
        case 'list-item':
            return <li {...attributes}>{children}</li>;
        case 'numbered-list':
            return <ol {...attributes}>{children}</ol>;
        case 'code-block':
            return (
                <pre
                  className='code-block'
                  {...attributes}
                  style={{
                    backgroundColor: 'black',
                    borderRadius: '5px',
                    padding: '12px',
                    tabSize: '4'
                  }}
                >
                  <code>{children}</code>
                </pre>
              );
        default:
            return <p {...attributes}>{children}</p>;
    }
};

export const Leaf = ({ attributes, children, leaf }) => {
    if (leaf.bold) {
        children = <strong>{children}</strong>;
    }

    if (leaf.code) {
        children = <span {...attributes} className={`token ${leaf.prismToken}`}>{children}</span>;
    }

    if (leaf.italic) {
        children = <em>{children}</em>;
    }

    if (leaf.underline) {
        children = <u>{children}</u>;
    }

    return <span {...attributes}>{children}</span>;
};

const BlockButton = ({ format, children }) => {
    const editor = useSlate();
    return (
        <Box ml={1} mt={1}>
            <ToggleButton
                value={format}
                selected={isBlockActive(editor, format)}
                onMouseDown={event => {
                    event.preventDefault();
                    toggleBlock(editor, format);
                }}
                style={{ lineHeight: 1 }}
            >
                {children}
            </ToggleButton>
        </Box>
    );
};

const MarkButton = ({ format, children }) => {
    const editor = useSlate();
    return (
        <Box ml={1} mt={1}>
            <ToggleButton
                value={format}
                selected={isMarkActive(editor, format)}
                onMouseDown={event => {
                    event.preventDefault();
                    toggleMark(editor, format);
                }}
                style={{ lineHeight: 1 }}
            >
                {children}
            </ToggleButton>
        </Box>
    );
};

const Menu = React.forwardRef(({ children, ...props }, ref) => (
    <>
        <Box
            display='flex'
            direction='row'
            justify='flex-start'
            alignItems='center'
            flexWrap='wrap'
        >
            {children}
        </Box>
        <Box pt={2}>
            <Divider variant='middle' />
        </Box>
    </>
));

const Toolbar = React.forwardRef(({ className, ...props }, ref) => (
    <Menu {...props} ref={ref} />
));

const LIST_TYPES = ['numbered-list', 'bulleted-list'];

const isBlockActive = (editor, format) => {
    const [match] = Editor.nodes(editor, {
        match: n => n.type === format
    });
    return !!match;
};

const isMarkActive = (editor, format) => {
    const marks = Editor.marks(editor);
    return marks ? marks[format] === true : false;
};

const toggleBlock = (editor, format) => {
    const isActive = isBlockActive(editor, format);
    const isList = LIST_TYPES.includes(format);

    Transforms.unwrapNodes(editor, {
        match: n => LIST_TYPES.includes(n.type),
        split: true
    });

    Transforms.setNodes(editor, {
        type: isActive ? 'paragraph' : isList ? 'list-item' : format
    });

    if (!isActive && isList) {
        const block = { type: format, children: [] };
        Transforms.wrapNodes(editor, block);
    }
};

const toggleMark = (editor, format) => {
    const isActive = isMarkActive(editor, format);

    if (isActive) {
        Editor.removeMark(editor, format);
    } else {
        Editor.addMark(editor, format, true);
    }
};

const useOnKeydown = (editor) => {
    const onKeyDown = useCallback(e => {
        if (isHotkey('tab', e)) {
            // handle tab key, insert spaces
            e.preventDefault()
            Editor.insertText(editor, '  ')
        }
    }, [])

    return onKeyDown;
};



export default RichEditor;
