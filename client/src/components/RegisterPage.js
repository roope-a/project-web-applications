import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';

import Link from '@mui/material/Link';
import Header from './Header'

function RegisterPage() {

    // some fect requests here 

    return (
        <Box>
            <Header />
            <Box display='flex'
                justifyContent='center'
                sx={{ mx: 'auto', my: 'auto', height: '100vh' }}>
                <Grid container
                    spacing={0}
                    direction='column'
                    alignItems='center'
                    justifyContent='center'>
                    <Paper elevation={3}>
                        <Box sx={{ p: 2, borderRadius: 4 }}>
                            <Grid container direction='column' align='center' p={1}>
                                <TextField label='Display name' style={{ marginTop: 10 }} />
                                <TextField label='Email' style={{ marginTop: 10 }} />
                                <TextField label='Password' style={{ marginTop: 10 }} />
                                <Typography fontSize={12} maxWidth={'15rem'} style={{ marginTop: 10 }}>Passwords must contain at least eight characters, including at least 1 letter and 1 number. </Typography>
                                <Button variant='contained' color='secondary' style={{ marginTop: 10 }}>Sign up</Button>
                            </Grid>
                        </Box>
                    </Paper>
                    <Box sx={{ mt: 2, }}>
                        Already have an account?
                        <Link component={RouterLink} to='/users/login' underline='none' marginLeft={1}>Log in</Link>
                    </Box>
                </Grid>
            </Box>
        </Box>
    );
}

export default RegisterPage;