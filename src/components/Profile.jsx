import { IconButton, Menu, MenuItem } from '@material-ui/core';

import { AccountCircle as ProfileIcon } from '@material-ui/icons';
import { useState } from 'react';
import { NavLink } from './Link';

export default function Profile() {
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
        onClick={openMenu}
      >
        <ProfileIcon />
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
          <NavLink to="/login">Login</NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink to="/logout">Logout</NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
