import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { useTheme } from '@mui/material/styles';
import { Collapse, Drawer, List, ListItem } from '@mui/material';
import LeftSideBar from './LeftSideBar';

// AppBar design from https://mui.com/material-ui/react-app-bar/
// Drawer https://mui.com/material-ui/react-drawer/

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import NavLinks from './NavLinks';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        // [theme.breakpoints.up('md')]: {
        //     width: '20ch',
        // },
    },
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
    [theme.breakpoints.up('md')]: {
        display: 'none',
    },
}));

function Header() {

    const theme = useTheme();

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    // const mobileMenuId = 'primary-search-account-menu-mobile';
    // const renderMobileMenu = (
    //     <Menu
    //         anchorEl={mobileMoreAnchorEl}
    //         anchorOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         id={mobileMenuId}
    //         keepMounted
    //         transformOrigin={{
    //             vertical: 'top',
    //             horizontal: 'right',
    //         }}
    //         open={isMobileMenuOpen}
    //         onClose={handleMobileMenuClose}
    //     >
    //         <MenuItem>
    //             <IconButton size='large' aria-label='show 4 new mails' color='inherit'>
    //                 <Badge badgeContent={4} color='error'>
    //                     <MailIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Messages</p>
    //         </MenuItem>
    //         <MenuItem>
    //             <IconButton
    //                 size='large'
    //                 aria-label='show 17 new notifications'
    //                 color='inherit'
    //             >
    //                 <Badge badgeContent={17} color='error'>
    //                     <NotificationsIcon />
    //                 </Badge>
    //             </IconButton>
    //             <p>Notifications</p>
    //         </MenuItem>
    //         <MenuItem onClick={handleProfileMenuOpen}>
    //             <IconButton
    //                 size='large'
    //                 aria-label='account of current user'
    //                 aria-controls='primary-search-account-menu'
    //                 aria-haspopup='true'
    //                 color='inherit'
    //             >
    //                 <AccountCircle />
    //             </IconButton>
    //             <p>Profile</p>
    //         </MenuItem>
    //     </Menu>
    // );


    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };


    return (
        <Box sx={{ flexGrow: 1, borderTop: 2, borderColor: theme.palette.accent }}>
            <AppBar position='relative' sx={{ zIndex: theme.zIndex.drawer + 1 }}>
                <Toolbar sx={{ justifyContent: 'space-between' }}>

                    <StyledIconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </StyledIconButton>
                    <StyledIconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerClose}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(!open && { display: 'none' }),
                        }}
                    >
                        <ChevronLeftIcon />
                    </StyledIconButton>

                    <Search sx={{ flexGrow: 1 }}>
                        <StyledInputBase fullWidth={true}
                            placeholder='Search…'
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    {/* <Box sx={{ flexGrow: 1 }} /> */}
                    <IconButton
                        size='large'
                        edge='end'
                        aria-label='account of current user'
                        aria-controls={menuId}
                        aria-haspopup='true'
                        onClick={handleProfileMenuOpen}
                        color='inherit'
                    >
                        <AccountCircle />
                    </IconButton>
                    {/* <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='show more'
                                aria-controls={mobileMenuId}
                                aria-haspopup='true'
                                onClick={handleMobileMenuOpen}
                                color='inherit'
                            >
                                <MoreIcon />
                            </IconButton>
                        </Box> */}
                </Toolbar>
            </AppBar>
            <Drawer open={open} sx={{width: 'auto', [theme.breakpoints.up('md')]: {display: 'none'}, '& .MuiDrawer-paper': { width: 200, height:'auto', overflow: 'hidden'},}}>
                <Toolbar/>
                <NavLinks/>
            </Drawer>

            {/* {renderMobileMenu} */}
            {renderMenu}
        </Box>
    );
}

export default Header;