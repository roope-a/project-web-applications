import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AskButton from './AskButton'

function SubHeader({title}) {
    return (
        <Box sx={{ p: 1 }}>
            <Grid container spacing={0} alignItems='flex-start'>
                <Grid item xs={7}>
                    <Typography>
                        <h1 align='left'>{ title }</h1>
                    </Typography>
                </Grid>
                <Grid item xs={5}><AskButton /></Grid>
            </Grid>
        </Box>
    );
}

export default SubHeader;