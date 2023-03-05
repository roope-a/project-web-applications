import { Container, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PageBase from './PageBase';
import { useParams } from 'react-router-dom'
import moment from 'moment';

function ProfilePage() {

    const { id } = useParams();

    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState({});
    const [date, setDate] = useState('');

    useEffect(() => {
        fetch('/users/'+id)
            .then(response => response.json())
            .then(json => {
                setUser(json);
            })
            .catch((error) => {
            });

        fetch('/users/profile/' + id + '/posts')
            .then(response => response.json())
            .then(json => {
                setPosts(json);
            })
            .catch((error) => {
            });
    }, []);

    useEffect(() => {
        setDate(moment(new Date(user.registerDate)).fromNow());
    }, [user]);

    return (
        <PageBase>
            <Grid item>
                <Box sx={{ borderLeft: 2, borderColor: 'divider', pb: 10, minHeight: '100vh' }}>
                    <Grid container p={3} direction='row' >
                        <Box sx={{ width: 125, height: 125, backgroundColor: 'primary.dark', borderRadius: 1 }}></Box>
                        <Grid item m={3}>
                            <Typography variant='h4' align='left'>{ user.displayName }</Typography>
                            <Typography align='left'>User registered { date }</Typography>
                        </Grid>
                    </Grid>
                    <Grid container p={3} direction='column'>

                        {/* <Typography variant='h5' align='left'>About</Typography> */}
                        {/* <Typography align='left'>Here is some nice text about me </Typography> */}

                        <Typography align='left' mt={6}>Newest posts</Typography>

                        <Box sx={{ border: 1, borderRadius: 1, borderColor: grey[800] }}>

                            <Grid container direction='column'>
                                {posts && posts.length > 0 && posts.map((question) => (
                                    <Box p={1} sx={{ borderBottom: 1 }}>
                                        <Grid container direction='row' justifyContent='flex-start' alignItems='center'>
                                            <Grid item xs='auto'>
                                                <Box sx={{ minWidth: '3rem', borderColor: grey[800], borderRadius: 1, border: 1, m: 2, p: 1 }} alignContent='center'>
                                                    1
                                                </Box>
                                            </Grid>
                                            <Grid item xs>
                                                <Typography p={1} align='left'
                                                    style={
                                                        {
                                                            overflowWrap: 'break-word',
                                                            wordBreak: 'break-word',
                                                            // whiteSpace: 'nowrap',
                                                            // overflow: 'hidden',
                                                            // textOverflow: 'ellipsis',
                                                            // WebkitLineClamp: 0,
                                                            WebkitBoxOrient: 'vertical'
                                                        }
                                                    }>
                                                    {question.qTitle}
                                                    {question.votes}
                                                    {question.id}
                                                    {question.timestamp}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    </Box>

                                ))}
                            </Grid>
                        </Box>
                    </Grid>
                </Box>
            </Grid>
        </PageBase>
    );
}

export default ProfilePage;