import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AskButton from './AskButton'

function SubHeader({title}) {
    return (
        <Box sx={{ p: 3 }}>
            <Grid container direction='row' alignItems='flex-start'>
                <Grid item xs={9}>
                    <Typography align='left' variant='h4'>
                        { title }
                    </Typography>
                    
                </Grid>
                <Grid item xs><AskButton /></Grid>
            </Grid>
        </Box>
    );
}

export default SubHeader;