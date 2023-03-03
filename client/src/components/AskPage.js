import { FormControl, FormLabel, Grid, List, ListItem, OutlinedInput, Paper, Typography } from '@mui/material';
import { Box, Container } from '@mui/system';
import React, { useState } from 'react';
import Footer from './Footer';
import Header from './Header';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import SlateEditor from './SlateEditor';

import "./prism-tomorrow.css";

const initialValue = [
    {
      children: [
        { text: 'This is editable plain text, just like a <textarea>!' },
      ],
    },
  ];

function ProfilePage() {
    const [input, setInput] = useState(initialValue);

    return (
        <Box>
            <Header />
            <Container sx={{ maxWidth: 1264, p: 3 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Grid container justifyContent='center' alignItems='center' spacing={2}>


                        {/* <Box sx={{ width: 500, height: 80, backgroundColor: 'primary.dark', borderRadius: 1 }}>
                            <Typography align='left'>Title</Typography>
                            <FormControl>
                                <OutlinedInput></OutlinedInput>
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
                                        <OutlinedInput margin={3} >

                                        </OutlinedInput>
                                    </FormControl></Box>
                            </Paper>
                        </Grid>
                        <Grid item xs={8} >
                            <Paper>

                                <Box sx={{ p: 3 }}>
                                    <Typography variant='h6' align='left'>What are the details of your problem?</Typography>
                                    {/* <Box sx={{ border: 1, borderRadius: 1, backgroundColor: 'white' }}> */}

                                        <SlateEditor value={input} setValue={setInput}></SlateEditor>

                                    {/* </Box>  */}
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

export default ProfilePage;