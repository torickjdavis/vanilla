import { makeStyles } from '@material-ui/core/styles';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

import {
  MenuBookTwoTone as MenuBookIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import Profile from './Profile';
import { NavLink } from './Link';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(2),
    color: 'var(--accent-color)',
  },
  titleLink: {
    flexGrow: 1,
  },
  titleLinkContent: {
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar color="primary" position="sticky">
      <Toolbar>
        <NavLink exact to="/" className={classes.titleLink}>
          <div className={classes.titleLinkContent}>
            <MenuBookIcon fontSize="large" className={classes.logo} />
            <Typography variant="h6" noWrap className={classes.title}>
              Vanilla
            </Typography>
          </div>
        </NavLink>
        <NavLink to="/explore">
          <IconButton>
            <SearchIcon aria-label="Search and Explore" />
          </IconButton>
        </NavLink>
        <Profile />
      </Toolbar>
    </AppBar>
  );
}
