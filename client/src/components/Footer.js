import { Box, Grid, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React from 'react';

function Footer() {
    const theme = useTheme();
    return (
        <Box p={3} sx={{ flexGrow: 1, backgroundColor: theme.palette.footer }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Paper>xs=2</Paper>
                    </Grid>
                ))}
            </Grid>

        </Box>
    );
}

export default Footer;