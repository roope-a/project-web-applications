import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Link, List, Toolbar, Typography } from '@mui/material';
import NavLinks from './NavLinks';


const SideBar = styled(Box)(({ theme }) => ({
    width: 175,
    // height: '1',
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

function LeftSideBar() {
    const theme = useTheme();
    return (
    <SideBar position='relative' >
            <Box position='fixed' sx={{ width: 175 }}>
                <NavLinks />
            </Box>
        </SideBar>
    );
}

export default LeftSideBar;