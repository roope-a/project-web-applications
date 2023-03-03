import { Button, Container, FormControl, Grid, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Link from '@mui/material/Link';
import Header from './Header'

function RegisterPage() {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [isError, setIsError] = useState({ email: false, password: false , displayName: false });

    
    
    const submit = (e) => {
        e.preventDefault();
        fetch('/users/register', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(formData),
            mode: 'cors'
        })
            .then(response => response.json())
            .then((json) => {
                if (json.hasOwnProperty('error')) {

                    console.log(json.error)

                    // FIX ME, return customized array from server

                    // if (json.error[0].param) {setIsError({...isError, [json.error[0].param]: true })}
                    // if (json.error[1].param) {setIsError({...isError, [json.error[1].param]: true })}
                    
            
                } else {
                    console.log()
                    // if (json.success === true ) {
                    //     localStorage.setItem('auth', json.token);
                    //     navigate('/');
                    // }
                }
            }
        );
    };

    // useEffect(() =>{
    //     setIsError({...isError, params})
    // }, [params])

    const handleClickShowPassword = () => setShowPassword((showPassword) => !showPassword);
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        console.log(formData)
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
                                required={ true }
                                style={{ marginTop: 10 }}>
                                <InputLabel>Display name</InputLabel>
                                    <OutlinedInput
                                        onChange={ handleChange }
                                        id='displayName'
                                        label='displayName'
                                    />
                                </FormControl>
                                <FormControl 
                                required={ true }
                                error={ isError.email }
                                style={{ marginTop: 10 }}>
                                    <InputLabel>Email</InputLabel>
                                    <OutlinedInput
                                        onChange={ handleChange }
                                        id='email'
                                        label='email'
                                    />
                                </FormControl>
                                <FormControl 
                                    required={ true }
                                    error={ isError.password }
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
                                <Typography fontSize={12} maxWidth={'15rem'} style={{ marginTop: 10 }}>Passwords must contain at least eight characters, including at least 1 upper and lowercase letter and 1 number.</Typography>
                                <Button 
                                onClick={ submit }
                                type='submit'
                                variant='contained' 
                                color='secondary' 
                                style={{ marginTop: 10 }}>Sign up
                                </Button>
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