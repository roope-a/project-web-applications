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
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

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
    const navigate = useNavigate();

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
                if (json.success === true) {
                    window.location.reload();
                }   
            }
            );
    };

    const [isAuthenticated, setIsAuthenticated] = useState((false));
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('auth'));
    }, []);

    return (
        <PageBase>
            <Grid item xs>
                <Box sx={{ borderLeft: 2, borderColor: 'divider' }}>
                    <SubHeader title={title} />
                    <Typography p={3} align='left'>
                        Asked { moment(new Date(date)).fromNow() }
                    </Typography>

                    {/* // main post  */}
                    <Post></Post>
                    {/* <Comment postContent={ post.content } postVotes={ post.votes }  ></Comment> */}

                    <Typography p={3} align='left' variant='h6'>
                        Answers
                    </Typography>

                    {/* comments */}

                    {comments && comments.length > 0 && comments.map((comment, index) => (
                        <React.Fragment key={index}>
                            <Comment postContent={comment.content} postVotes={comment.votes} authorId={comment.userId} author={comment.user} timestamp={moment(new Date(comment.createdAt)).fromNow()}></Comment>
                        </React.Fragment>
                    ))}

                    {/* Conditional rendering for this */}

                    <Box sx={{ borderTop: 1, borderColor: theme.palette.divider, m: 3, pt: 2 }}>
                        <Typography py={2} align='left' variant='h5'>
                            Your answer
                        </Typography>
                        <RichEditor value={content} setValue={setContent} placeholder='Your answer here...'></RichEditor>
                        <Box p={2} display='flex' alignItems='flex-end' justifyContent='flex-end'>
                            <Button onClick={submit}
                                variant='contained'
                                color='secondary'
                                disabled={ isAuthenticated ? false : true }
                                >Post your answer
                            </Button>
                        </Box>

                    </Box>
                </Box>
            </Grid>
        </PageBase>
    );
}

export default QuestionPage;