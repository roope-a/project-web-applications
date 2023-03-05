import React, { useEffect } from 'react';
import { List, Link, ListItem, Toolbar, Typography, ListItemButton, MenuItem, makeStyles } from '@mui/material';
import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { purple } from '@mui/material/colors';

function NavLinks() {
    const theme = useTheme();

    //TODO fix the border highlight

    const [selectedIndex, setSelectedIndex] = React.useState();

    const buttonProps = (value) => ({
        selected: selectedIndex === value,
        borderRight: 2, 
        borderColor: theme.palette.accent,
        onClick: () => setSelectedIndex(value),
    });

    return (
        
        <List  sx={{marginTop: 3}}>
            <MenuItem component={RouterLink} to={'/'} {...buttonProps(0)} sx={{borderRight: 2, borderColor: theme.palette.accent}}>
                Home
            </MenuItem>
            <MenuItem>
                <Typography >Public</Typography>
            </MenuItem>
            <List >
                <MenuItem component={RouterLink} to={'/questions'} sx={{borderColor: theme.palette.accent}} {...buttonProps(1)}>
                    {/* <ListItemButton sx={{}} {...buttonProps(0)}>
                        <Link component={RouterLink} to={'/questions'} >Questions</Link>
                    </ListItemButton> */}
                    Questions
                </MenuItem>
                <MenuItem component={RouterLink} to={'/users'} sx={{borderColor: theme.palette.accent}}>
                    Users
                </MenuItem>
            </List>
        </List>
    );
}

export default NavLinks;