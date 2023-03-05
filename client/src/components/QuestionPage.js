import { Grid, Typography, Button } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PageBase from './PageBase';
import Post from './QuestionPost';
import Comment from './QuestionComment';
import SubHeader from './SubHeader';
import RichEditor from './SlateEditor';
import { useParams } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';


const initialValue = [
    {
        children: [
            { text: '' },
        ],
    },
];

function QuestionPage() {

    const theme = useTheme();
    const { id } = useParams();

    const [content, setContent] = useState(initialValue);
    // const [postContent, setPostContent] = useState(initialValue);
    // const [votes, setVotes] = useState(0);
    const [postID, setPostID] = useState(0);
    const [title, setTitle] = useState('');
    const [date, setDate] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        fetch('/questions/' + id)
            .then(response => response.json())
            .then(json => {
                setTitle(json.title)
                setPostID(json._id)
                setDate(json.createdAt)
            })
            .catch((error) => {
            });

        fetch('/questions/' + id + '/comments')
            .then(response => response.json())
            .then(json => {
                setComments(json)
            })

            .catch((error) => {
            });

    }, []);


    const submit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('token');
        if (!authToken) return;
        const body = { postID: postID, content: content }
        console.log(body)
        fetch('/questions/:id/comments', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
                'authorization': 'Bearer ' + authToken
            },
            body: JSON.stringify(body),
            mode: 'cors'
        })
            .then(response => response.json())
            .then((json) => {
            }
            );
    };

    // TODO make the voting buttons work
    // needs backend too, fuck

    // TODO add refresh page on comment post 

    return (
        <PageBase>
            <Grid item xs>
                <Box sx={{ borderLeft: 2, borderColor: 'divider' }}>
                    <SubHeader title={title} />
                    <Typography p={3} align='left'>
                        Asked {date}
                    </Typography>

                    {/* // main post  */}
                    <Post></Post>
                    {/* <Comment postContent={ post.content } postVotes={ post.votes }  ></Comment> */}

                    <Typography p={3}>
                        <h4 align='left'>Answers</h4>
                    </Typography>

                    {/* comments */}

                    {comments && comments.length > 0 && comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            <Comment postContent={comment.content} postVotes={comment.votes}></Comment>
                        </React.Fragment>
                    ))}

                    {/* Conditional rendering for this */}

                    <Box sx={{ borderTop: 1, borderColor: theme.palette.divider, m: 3, pt: 2 }}>
                        <Typography>
                            <h4 align='left'>Your answer</h4>
                        </Typography>
                        <RichEditor value={content} setValue={setContent} placeholder='Your answer here...'></RichEditor>
                        <Box p={2} display='flex' alignItems='flex-end' justifyContent='flex-end'>
                            <Button onClick={submit}
                                variant='contained'
                                color='secondary'
                                align>Post your answer
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Grid>
        </PageBase>
    );
}

export default QuestionPage;