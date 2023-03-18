import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { width } from '@mui/system';
import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Avatar } from '@mui/material';
import LoginModal from '../modal/loginmodal';
import Login from '../pages/Login';
import AddToHomeScreenIcon from '@mui/icons-material/AddToHomeScreen';

export default function NewNavBar({ user, CoinsData, watchList, removeFromWatchlist }) {
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

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge >
            <AddToHomeScreenIcon />
          </Badge>
        </IconButton>
        <Link to="/">
        <p>Home</p>
        </Link>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={1} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <Link to="https://github.com/Nikesh-Uprety/Crypto-App-React.git" target={'_blank'}>
        <p>Source</p>
        </Link>
      </MenuItem>
    
    </Menu>
  );

  return (

    <Box sx={{ flexGrow: 1, }}>
      <AppBar sx={{ backgroundColor: "#b2a3a399" }} position="fixed">
        <Toolbar>
          <Avatar
            style={{
              width: 40,
              height: 40,
              margin: "3px",
              cursor: "pointer",

            }}
            src="https://yt3.ggpht.com/yti/AHXOFjXDxlpJaOKwfBrJqnH7JH27ffV7h2mM_uZEznz5nSQ=s88-c-k-c0x00ffffff-no-rj-mo"
          >
            <MenuIcon />
          </Avatar>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } ,color:"Black"}}
          >
            NikuCoinCap
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            {user ?( <Sidebar
              removeFromWatchlist={removeFromWatchlist}
              user={user}
              CoinsData={CoinsData}
              watchList={watchList}
            />):(
              <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } ,color:"Black"} }
          >
            <LoginModal/>
          </Typography>
            )}
           
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <Sidebar

              removeFromWatchlist={removeFromWatchlist}
              user={user}
              CoinsData={CoinsData}
              watchList={watchList}
            />
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
