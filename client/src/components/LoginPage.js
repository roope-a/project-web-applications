import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from './Header'

function LoginPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState({ email: false, password: false, both: false });

    const submit = (e) => {
        e.preventDefault();
        fetch('/users/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
            mode: 'cors'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.hasOwnProperty('error')) {
                    
                    setIsError({...isError, [json.error[0].param]: true})
                } else {
                    if (json.success === true ) {
                        localStorage.setItem('token', json.token);
                        navigate('/');
                    }
                }
            }
        );
    };

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        setIsError({...isError, [e.target.id]: false});
    };

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
                                <FormControl 
                                error={ isError.email || isError.both }
                                style={{ marginTop: 10 }}>
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput
                                        onChange={ handleChange }
                                        id='email'
                                        label='email'
                                    />
                                </FormControl>
                                <FormControl 
                                    error={ isError.password || isError.both }
                                    style={{ marginTop: 10 }}>
                                    <InputLabel>Password</InputLabel>
                                    <OutlinedInput
                                        onChange={ handleChange }
                                        id='password'
                                        type={showPassword ? 'text' : 'password'}
                                        label='Password'
                                        endAdornment={<InputAdornment position='end'>
                                            <IconButton
                                                aria-label='toggle password visibility'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge='end'>
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>}
                                    />
                                </FormControl>
                                <Button
                                    onClick={ submit }
                                    type='submit'
                                    variant='contained'
                                    color='secondary'
                                    style={{ marginTop: 10 }}>Log in
                                </Button>
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
        </Box>
    );
}

export default LoginPage;