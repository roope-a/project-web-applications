import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import PageBase from './PageBase';

function UsersPage() {

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('/users')
            .then(response => response.json())
            .then(json => {
                console.log(json)
                setUsers(json)
            })
            .catch((error) => {
            });
    }, []);

    return (
        <Box>
            <PageBase>
                <Grid item xs>
                    <Box sx={{ borderLeft: 2, borderColor: 'divider', pb: 10, minHeight: '100vh' }}>
                        <Typography align='left' variant='h4' p={3}>Users</Typography>
                        <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} p={3}>
                            {users && users.length > 0 && users.map((user, index) => (
                                <React.Fragment key={index}>
                                    <Grid item xs={4} >
                                        <Paper>
                                            <Grid container direction='row'>
                                            <Box m={2} sx={{ width: 48, height: 48, backgroundColor: 'primary.dark', borderRadius: 1 }}></Box>
                                            <Box m={2}>
                                                {user.displayName}
                                            </Box>
                                            </Grid>
                                        </Paper>
                                    </Grid>
                                </React.Fragment>
                            ))}
                        </Grid>
                    </Box>
                </Grid>

            </PageBase>
        </Box>
    );
}

export default UsersPage;