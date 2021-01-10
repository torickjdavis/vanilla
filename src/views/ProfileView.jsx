import BoxContent from './BoxContent';
import RecipeContent from './RecipeContent';
import useToggle from '../hooks/useToggle';
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Paper,
  Toolbar,
} from '@material-ui/core';
import clsx from 'clsx';
import {
  Menu as MenuIcon,
  MenuOpen as MenuOpenIcon,
  Inbox as BoxIcon,
  Receipt as RecipeIcon,
} from '@material-ui/icons';
import { useState } from 'react';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  // heavily inspired by https://material-ui.com/components/drawers/#mini-variant-drawer
  root: {
    display: 'flex',
    overflowX: 'hidden',
    flexGrow: 1,
  },
  content: {
    flexGrow: 1,
    background: theme.palette.primary.main,
    padding: theme.spacing(4),
    overflowY: 'auto',
  },
  spacerToolbar: {
    minHeight: theme.spacing(8), // override for visual consistency on mobile and desktop
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerPaper: {
    zIndex: 'initial',
  },
  drawerList: {
    padding: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(7), // number automatically converted to px?
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(0), // 0 8px (multiple arity) https://material-ui.com/customization/spacing/#multiple-arity
    ...theme.mixins.toolbar,

    '&.open': {
      justifyContent: 'flex-end',
    },
  },
}));

export default function ProfileView() {
  const classes = useStyles();

  const { state: isOpen, toggle: toggleOpen } = useToggle(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const listContent = [
    {
      primaryText: 'Boxes',
      secondaryText: 'Your collections.',
      icon: BoxIcon,
      content: <BoxContent />,
    },
    {
      primaryText: 'Recipes',
      secondaryText: 'All of your recipes.',
      icon: RecipeIcon,
      content: <RecipeContent />,
    },
  ];

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          // TODO abstract to remove repetition
          [classes.drawerOpen]: isOpen,
          [classes.drawerClose]: !isOpen,
        })}
        classes={{
          paper: clsx(classes.drawerPaper, {
            [classes.drawerOpen]: isOpen,
            [classes.drawerClose]: !isOpen,
          }),
        }}
      >
        {/* empty toolbar adds space for clipped navbar */}
        <Toolbar className={classes.spacerToolbar} />
        <div
          className={clsx(classes.drawerHeader, {
            open: isOpen,
          })}
        >
          <IconButton onClick={toggleOpen}>
            {isOpen ? <MenuOpenIcon /> : <MenuIcon />}
          </IconButton>
        </div>
        <Divider />
        <List className={classes.drawerList}>
          {listContent.map(
            ({ primaryText, secondaryText, icon: Icon }, index) => (
              <ListItem
                button
                key={primaryText}
                selected={selectedIndex === index}
                onClick={() => setSelectedIndex(index)}
              >
                <ListItemIcon>
                  <Icon />
                </ListItemIcon>
                <ListItemText primary={primaryText} secondary={secondaryText} />
              </ListItem>
            )
          )}
        </List>
      </Drawer>
      <Paper className={classes.content} square component="main">
        {listContent[selectedIndex].content}
      </Paper>
    </div>
  );
}
