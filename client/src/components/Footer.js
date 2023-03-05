import { Box, Grid, IconButton, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import React, { useContext, useMemo, useState } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ColorModeContext = React.createContext({ toggleColorMode: () => { } });

function Footer() {

    const theme = useTheme();
    // const colorMode = useContext(ColorModeContext);

    return (
        <Box p={3} sx={{ flexGrow: 1, backgroundColor: theme.palette.footer, minHeight: '10vh' }}>
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {/* {Array.from(Array(6)).map((_, index) => (
                    <Grid item xs={2} sm={4} md={4} key={index}>
                        <Paper>xs=2</Paper>
                    </Grid>
                ))} */}
                <Grid item xs>
                <IconButton sx={{ ml: 1 }} color="inherit">
                    { theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Footer;