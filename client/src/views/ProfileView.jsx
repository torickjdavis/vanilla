import axios from 'axios';
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
  AllInbox as BoxesIcon,
  Receipt as RecipeIcon,
  Bookmarks,
} from '@material-ui/icons';
import { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useAuth } from '../contexts/AuthContext';
import { useRecipes } from '../contexts/RecipeContext';
import { useBoxes } from '../contexts/BoxContext';
import BoxForm from '../components/BoxForm';
import RecipeForm from '../components/RecipeForm';
import CreateButton from '../components/CreateButton';
import RecipeBookmarksForm from '../components/RecipeBookmarksForm';
import RecipeBookmarksContent from './RecipeBookmarksContent';

const drawerWidth = 240;

const CREATE_USER_BOOKMARKS = gql`
  mutation createUserBookmarks($data: RecipeBookmarksDataInput!) {
    createRecipeBookmarks(data: $data) {
      id
    }
  }
`;

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
    position: 'sticky',
    top: 0,
    float: 'right', // why does this work, but right: 0 doesn't?
    zIndex: 1,
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
  const { refresh: refreshRecipes } = useRecipes();

  const [boxFormVisible, setBoxFormVisible] = useState(false);
  const { refresh: refreshBoxes } = useBoxes();

  // prettier-ignore
  const [recipeBookmarksFormVisible, setRecipeBookmarksFormVisible] = useState(false);
  const [createUserBookmarks] = useMutation(CREATE_USER_BOOKMARKS);

  const [working, setWorking] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const { user, token } = useAuth();

  const listContent = [
    {
      primaryText: 'Boxes',
      secondaryText: 'Your collections.',
      icon: BoxesIcon,
      content: (
        <>
          <CreateButton
            onClick={() => setBoxFormVisible(true)}
            className={classes.addButton}
            pending={working}
          >
            Add Box
          </CreateButton>
          {boxFormVisible && (
            <BoxForm
              onClose={() => setBoxFormVisible(false)}
              onSubmit={async (values) => {
                console.debug('Create Box', values);
                setWorking(true);
                try {
                  await axios.post(
                    `${process.env.REACT_APP_API_URL}/box`,
                    { ...values, created: { by: user._id } },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                } catch (error) {
                  alert('An Unhandled Error Occurred');
                  console.error(error);
                } finally {
                  setWorking(false);
                  refreshBoxes();
                }
              }}
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
          <CreateButton
            onClick={() => setRecipeFormVisible(true)}
            className={classes.addButton}
            pending={working}
          >
            Add Recipe
          </CreateButton>
          {recipeFormVisible && (
            <RecipeForm
              onClose={() => setRecipeFormVisible(false)}
              onSubmit={async (values) => {
                console.log('Recipe', values);
                setWorking(true);
                try {
                  await axios.post(
                    `${process.env.REACT_APP_API_URL}/recipe`,
                    { ...values, created: { by: user._id } },
                    { headers: { Authorization: `Bearer ${token}` } }
                  );
                } catch (error) {
                  alert('An Unhandled Error Occurred');
                  console.error(error);
                } finally {
                  setWorking(false);
                  console.debug('Refreshing Recipes');
                  refreshRecipes();
                }
              }}
            />
          )}
          <RecipeContent userOnly />
        </>
      ),
    },
    {
      primaryText: 'Recipe Bookmarks',
      secondaryText: 'Bookmarked recipes.',
      icon: Bookmarks,
      content: (
        <>
          <CreateButton
            onClick={() => setRecipeBookmarksFormVisible(true)}
            className={classes.addButton}
            pending={working}
          >
            Add Recipe Bookmarks
          </CreateButton>
          {recipeBookmarksFormVisible && (
            <RecipeBookmarksForm
              onClose={() => setRecipeBookmarksFormVisible(false)}
              onSubmit={async (values) => {
                console.log('RecipeBookmarks', values);
                setWorking(true);
                try {
                  await createUserBookmarks({
                    variables: { data: { ...values, creator: user._id } },
                  });
                } catch (error) {
                  alert('An Unhandled Error Occurred');
                  console.error(error);
                } finally {
                  setWorking(false);
                }
              }}
            />
          )}
          <RecipeBookmarksContent />
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
