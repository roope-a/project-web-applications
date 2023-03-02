import React from 'react';
import { Button } from '@mui/material';
import { Box } from '@mui/system';
import { Link } from 'react-router-dom';



function AskButton() {
    return (
        <Box sx={{ pt: 2 }}>
            <Button variant='contained' color='secondary' component={ Link } to='/'>
                Ask Question
            </Button>
        </Box>
    );
}

export default AskButton;