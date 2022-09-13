import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import {alpha, Divider, InputBase, ListItemIcon, Modal, styled, useTheme} from "@mui/material";
import {Logout, Settings} from "@mui/icons-material";
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import AddBoxIcon from '@mui/icons-material/AddBox';
import ExploreIcon from '@mui/icons-material/Explore';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import InstagramIcon from '@mui/icons-material/Instagram';
import SearchIcon from '@mui/icons-material/Search';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import {useContext, useEffect} from "react";
import MyThemeContext from "../../context/ColorModeContext";
import UserContext from "../../context/GlobalData/User"
import {useNavigate} from "react-router-dom";
import UploadFile from "../modals/UploadFile/UploadFile";
import Button from "@mui/material/Button";
import { BASE_URL } from "../post/Post"

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '18ch'
        },
    },
}));


const Navbar = () => {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [currentNav, setCurrentNav] = React.useState(window.location.href === BASE_URL ? "home" : null);
    const {setMode, mode, theme} = useContext(MyThemeContext);
    const { user, setUser, token, setToken} = useContext(UserContext);

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const navigate = useNavigate();
    return (
        <AppBar position="sticky">
            <Container fixed>
                {currentNav === "upload" ?
                    <UploadFile currentNav={currentNav} setCurrentNav={setCurrentNav} />
                    : null}
                <Toolbar disableGutters>
                    <InstagramIcon sx={{ mr: {md: 1, sm: 1, xl: 1, lg: 1, xs: 1} }} />
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mr: {md: -3,xs: -1.5, sm: 20, xl: 33, lg: 33},
                            fontFamily: 'Apple Color Emoji',
                            fontWeight: 700,
                            letterSpacing: '.1rem',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                         Instagram
                    </Typography>
                    <Search sx={{display: {md: "flex", xs: "none"},  mr: {md: 15, lg: 15}, ml: {md: 15, lg: 0}}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search"
                            inputProps={{ 'aria-label': 'search' }} />
                    </Search>
                    { user ? <>
                    { currentNav === "home" ? <HomeRoundedIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, ml: {xs: 3.4}, fontSize: 30}} onClick={() => navigate(`/`)} /> : <HomeOutlinedIcon sx={{m:{md: 1, xs: 0},  ml: {xs: 3.4}, mr: {xs: 0.5}, fontSize: 30}} onClick={(e) => {setCurrentNav("home"); navigate(`/`); }}/> }
                    { currentNav === "chat" ? <ChatIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, fontSize: 30}} /> :  <ChatOutlinedIcon sx={{m:{md: 1, xs: 0}, mr: {xs: 0.5},fontSize: 30}} onClick={(e) => { setCurrentNav("chat"); navigate(`/page/chat`); }} /> }
                    { currentNav === "upload" ?  <AddBoxIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, fontSize: 30}} /> : <AddBoxOutlinedIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, fontSize: 30}} onClick={(e) => { setCurrentNav("upload");}} /> }
                    { currentNav === "explore" ? <ExploreIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, fontSize: 30}} /> : <ExploreOutlinedIcon sx={{m:{md: 1, xs: 0}, mr: {xs: 0.5},fontSize: 30}} onClick={(e) => { setCurrentNav("explore"); navigate(`/page/explore`); }} /> }
                    { currentNav === "like" ? <FavoriteIcon sx={{m:{md: 1, xs: 0},mr: {xs: 0.5}, fontSize: 30}} />:  <FavoriteBorderOutlinedIcon sx={{m:{md: 1, xs: 0}, mr: {xs: 0.5},fontSize: 30}} onClick={(e) => {setCurrentNav("like"); navigate(`/page/like`); }} /> }

                    <Box sx={{ flexGrow: 0 }}>
                        <Tooltip title="Open settings">
                            <IconButton onClick={handleOpenUserMenu} sx={{p: 0, m:{md: 1, xs: 0},ml: {xs: 0.6}, fontSize: {md: 30, xs: 25}}}>
                                <Avatar sx={{width: {md: 35, xs: 30}, height: {md: 35, xs: 30}}} alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                            </IconButton>
                        </Tooltip>
                        <Menu
                            sx={{ mt: '45px' }}
                            id="menu-appbar"
                            anchorEl={anchorElUser}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem onClick={(e) => {handleCloseUserMenu(e); navigate(`/${user.username}`); setCurrentNav("s")}}>
                                <ListItemIcon>
                                    <AccountCircleOutlinedIcon />
                                </ListItemIcon>
                                Profile
                            </MenuItem>
                            <MenuItem onClick={(e) => {handleCloseUserMenu(e); navigate(`/${user.username}/saved`);  setCurrentNav("s")}}>
                                <ListItemIcon>
                                    <BookmarkIcon fontSize="small" />
                                </ListItemIcon>
                                Saved
                            </MenuItem>
                            <MenuItem onClick={(e) => {handleCloseUserMenu(e); navigate(`/page/settings`); setCurrentNav("s")}} sx={{
                                width: 222,
                                textAlign: "left"
                            }}>
                                <ListItemIcon>
                                    <Settings fontSize="small" />
                                </ListItemIcon>
                                Settings
                            </MenuItem>
                            <Divider />
                            <IconButton sx={{ ml: 1 }}  color="inherit" onClick={() => {setMode(mode === "dark" ? "light" : "dark")
                                console.log(mode)}}>
                                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                            {" " + theme.palette.mode[0].toUpperCase() + theme.palette.mode.slice(1)} mode
                            <MenuItem onClick={(e) => {handleCloseUserMenu(e); setUser(null); setToken(null) }}>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                Logout
                            </MenuItem>
                        </Menu>
                    </Box>
                    </> : <>
                        <Button variant="outlined"  color="inherit" sx={{m:{md: 1, xs: 0}, ml: {xs: 3.4}, height: 35, mr: {xs: 0.5}}} onClick={(e) => navigate(`/`)} > SignIn </Button>
                        <Button variant="contained" sx={{m:{md: 1, xs: 0}, ml: {xs: 3.4},height: 35, mr: {xs: 0.5} }} onClick={(e) => navigate(`/register`)} > SignUp </Button>
                        <IconButton sx={{ ml: 1 }}  color="inherit" onClick={() => {setMode(mode === "dark" ? "light" : "dark")
                            console.log(mode)}}>
                            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                    </>}
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
