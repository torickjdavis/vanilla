import BoxContent from './BoxContent';
import RecipeContent from './RecipeContent';
import useToggle from '../hooks/useToggle';
import {
  Divider,
  Drawer,
  Fab,
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
  AllInbox as BoxesIcon,
  Receipt as RecipeIcon,
  Add as AddIcon,
} from '@material-ui/icons';
import { useState } from 'react';
import BoxForm from '../components/BoxForm';
import RecipeForm from '../components/RecipeForm';

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
    position: 'relative',
  },
  addButton: {
    background: theme.palette.success.main,
    position: 'sticky',
    top: 0,
    float: 'right', // why does this work, but right: 0 doesn't?
    zIndex: 1,

    '&:hover': {
      background: theme.palette.success.dark,
    },
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
  [theme.breakpoints.down('sm')]: {
    drawerPaperOverlay: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: theme.palette.primary.dark,
      opacity: 0.8,
      zIndex: 1,
    },
    drawerPaperOpen: {
      position: 'relative',
      overflow: 'hidden',
      whiteSpace: 'noWrap',
    },
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
  const [recipeFormVisible, setRecipeFormVisible] = useState(false);
  const [boxFormVisible, setBoxFormVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const listContent = [
    {
      primaryText: 'Boxes',
      secondaryText: 'Your collections.',
      icon: BoxesIcon,
      content: (
        <>
          <Fab
            onClick={() => setBoxFormVisible(true)}
            variant="extended"
            className={classes.addButton}
          >
            <AddIcon />
            Add Box
          </Fab>
          {boxFormVisible && (
            <BoxForm
              onClose={() => setBoxFormVisible(false)}
              onSubmit={(values) => console.log('Box', values)}
            />
          )}
          <BoxContent userOnly />
        </>
      ),
    },
    {
      primaryText: 'Recipes',
      secondaryText: 'All of your recipes.',
      icon: RecipeIcon,
      content: (
        <>
          <Fab
            onClick={() => setRecipeFormVisible(true)}
            variant="extended"
            className={classes.addButton}
          >
            <AddIcon />
            Add Recipe
          </Fab>
          {recipeFormVisible && (
            <RecipeForm
              onClose={() => setRecipeFormVisible(false)}
              onSubmit={(values) => console.log('Recipe', values)}
            />
          )}
          <RecipeContent userOnly />
        </>
      ),
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
      <Paper
        className={clsx(classes.content, {
          [classes.drawerPaperOpen]: isOpen,
        })}
        square
        component="main"
      >
        {isOpen && <div className={classes.drawerPaperOverlay}></div>}
        {listContent[selectedIndex].content}
      </Paper>
    </div>
  );
}
