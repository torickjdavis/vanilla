import { IconButton, Menu, MenuItem } from '@material-ui/core';

import { AccountCircle as ProfileIcon } from '@material-ui/icons';
import { useState } from 'react';

export default function Profile() {
  const [anchor, setAnchor] = useState(null);

  const openMenu = (event) => setAnchor(event.currentTarget);
  const closeMenu = () => setAnchor(null);

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
        <MenuItem>Profile</MenuItem>
        <MenuItem>Account</MenuItem>
        <MenuItem>Login</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </>
  );
}
