import { makeStyles } from '@material-ui/core/styles';

import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';

import {
  MenuBook as MenuBookIcon,
  Search as SearchIcon,
} from '@material-ui/icons';

import Profile from './Profile';

const useStyles = makeStyles((theme) => ({
  logo: {
    margin: theme.spacing(2),
    color: '#f3e5ab',
  },
  title: {
    flexGrow: 1,
  },
}));

export default function Navbar() {
  const classes = useStyles();
  return (
    <AppBar color="primary" position="static">
      <Toolbar>
        <MenuBookIcon className={classes.logo} />
        <Typography variant="h6" noWrap className={classes.title}>
          Vanilla
        </Typography>
        <IconButton>
          <SearchIcon aria-label="Search and Explore" />
        </IconButton>
        <Profile />
      </Toolbar>
    </AppBar>
  );
}
