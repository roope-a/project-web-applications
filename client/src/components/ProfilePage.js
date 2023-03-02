import { Container, Grid, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import Header from './Header';
import LeftSideBar from './LeftSideBar';
import PageBase from './PageBase';

function ProfilePage() {
    return (
        <PageBase>
            <Grid item xs>
                <Grid container p={3} direction='row' >
                    <Box sx={{ width: 125, height: 125, backgroundColor: 'primary.dark', borderRadius: 1 }}></Box>
                    <Grid m={3}>
                        <Typography variant='h4' align='left'>Username</Typography>
                        <Typography align='left'>Register date</Typography>
                    </Grid>
                </Grid>
                <Grid container p={3} direction='column'>

                    <Typography variant='h5' align='left'>About</Typography>
                    <Typography align='left'>Here is some nice text about me </Typography>

                    <Typography align='left' mt={6}>Posts</Typography>

                    <Box sx={{ flexGrow: 1, display: 'flex', border: 1, borderRadius: 1, borderColor: grey[800] }}>
                        <Grid container direction='column' alignItems='stretch'>
                            {/* {posts.map((question) => (
                                    
                            ))}; */}
                            <Box p={1} sx={{ borderBottom: 1 }}>
                                <Typography align='left'>Post</Typography>
                            </Box>
                            <Typography align='left'>Post</Typography>
                        </Grid>
                    </Box>
                </Grid>
            </Grid>
        </PageBase>
    );
}

export default ProfilePage;