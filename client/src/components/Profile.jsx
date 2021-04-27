import { Avatar, IconButton, Menu, MenuItem } from '@material-ui/core';

import { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

import { NavLink } from './Link';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { isAuthenticated, user } = useAuth();

  const location = useLocation();

  const history = useHistory();
  // prettier-ignore
  const redirect = () => history.push('/authentication?action=login', { backdrop: location });

  const [anchor, setAnchor] = useState(null);
  const openMenu = (event) => setAnchor(event.currentTarget);
  const closeMenu = () => setAnchor(null);

  useEffect(() => {
    closeMenu(); // if authentication state changes, close menu
  }, [isAuthenticated]);

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
          src={user?.picture}
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
          <NavLink
            to={{
              pathname: '/account',
              state: { backdrop: location },
            }}
          >
            Account
          </NavLink>
        </MenuItem>
        <MenuItem>
          <NavLink
            to={{
              pathname: '/authentication',
              search: '?action=logout',
              state: { backdrop: location },
            }}
          >
            Logout
          </NavLink>
        </MenuItem>
      </Menu>
    </>
  );
}
