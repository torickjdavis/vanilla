import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';

import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { NavLink } from './Link';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  console.log(useAuth());

  const history = useHistory();
  const redirect = () => history.push('/authentication?action=login');

  const [anchor, setAnchor] = useState(null);
  const openMenu = (event) => setAnchor(event.currentTarget);
  const closeMenu = () => setAnchor(null);

  // ? when a menu item is clicked, there area areas which aren't the nav link, so the click isn't processed

  return (
    <>
      <IconButton
        aria-controls="profile-menu"
        aria-haspopup="true"
        aria-label="Profile Menu"
        onClick={isAuthenticated ? openMenu : redirect}
      >
        <Avatar
          src={user?.picture.thumbnail}
          alt={`${user?.name.first} ${user?.name.last}`}
        />
      </IconButton>
      <Menu
        id="profile-menu"
        anchorEl={anchor}
        keepMounted
        open={!!anchor}
        onClose={closeMenu}
      >
        <MenuItem>
          <NavLink to="/profile">Profile</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/account">Account</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/authentication?action=logout">Logout</NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
