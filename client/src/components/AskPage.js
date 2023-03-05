import { Button, FormControl, FormLabel, Grid, List, ListItem, Outlinedcontent, OutlinedInput, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useEffect, useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import RichEditor from './SlateEditor';
import { useNavigate } from 'react-router-dom';

// does this do anything
import "./prism-tomorrow.css";
import { Navigate } from 'react-router-dom';

const initialValue = [
    {
        children: [
            { text: 'This is editable plain text, just like a <textarea>!' },
        ],
    },
];

function AskPage() {

    const navigate = useNavigate();
    // const [isAuthenticated, setIsAuthenticated] = useState((false));
    const [content, setContent] = useState(initialValue);
    const [title, setTitle] = useState('');

    const submit = (e) => {
        e.preventDefault();
        const authToken = localStorage.getItem('token');
        if (!authToken) return;
        const body = { title: title, content: content }
        console.log(body)
        fetch('/questions/ask', {
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
                    navigate('/questions/'+json.id)
                }   
            }
            );
    };

    const [isAuthenticated, setIsAuthenticated] = useState((false));
    useEffect(() => {
        setIsAuthenticated(localStorage.getItem('auth'));
    }, []);

    const handleChange = (e) => {
        setTitle({ ...title, [e.target.id]: e.target.value });
        // setIsError({...isError, [e.target.id]: false});
    };

    // TODO, require X amount of content, and title

    return (
        <Box>
            <Header />
            <Container sx={{ maxWidth: 1264, p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent='center' alignItems='center' spacing={2}>


                        {/* <Box sx={{ width: 500, height: 80, backgroundColor: 'primary.dark', borderRadius: 1 }}>
                            <Typography align='left'>Title</Typography>
                            <FormControl>
                                <Outlinedcontent></Outlinedcontent>
                            </FormControl>
                        </Box> */}

                        <Grid item xs={8}>

                            <Paper>
                                <Box sx={{ p: 3 }}>
                                    <Typography variant='h5' align='left'>Writing a good question</Typography>
                                    <Typography></Typography>
                                    <Typography align='left'>Steps</Typography>
                                    <List
                                        dense={true}
                                        sx={{
                                            listStyleType: 'disc',
                                            pl: 2,
                                            '& .MuiListItem-root': {
                                                display: 'list-item',
                                            },
                                        }}>
                                        <ListItem>Summarize your problem in a one-line title.</ListItem>
                                        <ListItem>Describe your problem in more detail.</ListItem>
                                        <ListItem>Describe what you tried and what you expected to happen.</ListItem>
                                        <ListItem>Review your question and post it to the site.</ListItem>
                                    </List>
                                </Box>
                            </Paper>
                        </Grid>

                        <Grid item xs={8} >
                            <Paper>
                                <Box sx={{ p: 3 }}>
                                    <Typography variant='h6' align='left'>Title</Typography>
                                    <FormControl fullWidth={true}>
                                        <OutlinedInput
                                            onChange={handleChange}
                                            margin={3}
                                            id='title'>
                                        </OutlinedInput>
                                    </FormControl></Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} >
                            <Paper>

                                <Box sx={{ pt: 2, px: 2, m: 1 }}>
                                    <Typography variant='h6' align='left'>What are the details of your problem?</Typography>
                                    {/* <Box sx={{ border: 1, borderRadius: 1, backgroundColor: 'white' }}> */}

                                    <RichEditor value={content} setValue={setContent}></RichEditor>

                                    {/* </Box>  */}

                                </Box>
                                <Box p={2} display='flex' alignItems='flex-end' justifyContent='flex-end'>
                                    <Button onClick={submit}
                                        variant='contained'
                                        color='secondary'
                                        disabled={ isAuthenticated ? false : true}
                                    >Ask question
                                    </Button>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
            <Footer />
        </Box>
    );
}

export default AskPage;