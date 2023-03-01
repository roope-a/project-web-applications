import { Button, Grid, Paper, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from './Header'

function LoginPage() {

    // some fect requests here 

    return (
        <div>
        <div>
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
                                <TextField label='Email' style={{ marginTop: 10 }} />
                                <TextField label='Password' style={{ marginTop: 10 }} />
                                <Button variant='contained' style={{ marginTop: 10 }}>Log in</Button>
                            </Grid>
                        </Box>
                    </Paper>
                    <Box sx={{ mt: 2, }}>
                        <Link component={RouterLink} to='/' underline='none'>Forgot your password?</Link>
                    </Box>
                    <Box sx={{ mt: 2, }}>
                        Don't have an account?
                        <Link component={RouterLink} to='/users/register' underline='none' marginLeft={1}>Register here</Link>
                    </Box>
                    
                </Grid>

            </Box>

        </div>
        </div>
    );
}

export default LoginPage;