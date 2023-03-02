import { Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import PageBase from './PageBase';

function UsersPage() {
    return (
        <Box>
            <PageBase>
                <Grid item xs>
                    <Typography align='left' variant='h4' p={3}>Users</Typography>
                    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }} p={3}>
                        {Array.from(Array(10)).map((_, index) => (
                            <Grid item xs={2} sm={4} md={4} key={index}>
                                <Box sx={{ width: 240, height: 80, backgroundColor: 'primary.dark', borderRadius: 1 }}></Box>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </PageBase>
        </Box>
    );
}

export default UsersPage;