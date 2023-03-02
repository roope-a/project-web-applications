import { styled, alpha } from '@mui/material/styles';
import { Box } from '@mui/system';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Grid, Link, List, Toolbar, Typography } from '@mui/material';


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
        <Toolbar>
        <List mt={5}>
            <Link>Home</Link>
            <Typography pt={3}>Public</Typography>
            <Link>Questions</Link>
            <br></br>
            <Link>Users</Link>
        </List>
        </Toolbar>
        </SideBar>
    );
}

export default LeftSideBar;