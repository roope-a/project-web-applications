import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Link, List, Toolbar, Typography } from '@mui/material';
import NavLinks from './NavLinks';


const SideBar = styled(Box)(({ theme }) => ({
    width: 175,
    [theme.breakpoints.down('md')]: {
        display: 'none',
    },
}));

function LeftSideBar() {
    const theme = useTheme();
    return (
    <SideBar sx={{ height: '100vh', borderRight: 2, borderColor: theme.palette.divider }}>
        <NavLinks></NavLinks>
        </SideBar>
    );
}

export default LeftSideBar;