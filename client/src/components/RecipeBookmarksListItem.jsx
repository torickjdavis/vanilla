import { useState } from 'react';
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  ExpandMore as ExpandMoreIcon,
  OpenInNew as LinkIcon,
} from '@material-ui/icons';
import { useMutation, gql } from '@apollo/client';
import RecipeBookmarksForm from './RecipeBookmarksForm';
import DeleteButton from './DeleteButton';
import EditButton from './EditButton';

// TODO add error state

const UPDATE_USER_BOOKMARKS = gql`
  mutation updateUserBookmarks($id: Int!, $data: RecipeBookmarksDataInput!) {
    updateRecipeBookmarks(id: $id, data: $data) {
      id
    }
  }
`;

const REMOVE_USER_BOOKMARKS = gql`
  mutation RemoveUserBookmarks($id: Int!) {
    removeRecipeBookmarksById(id: $id) {
      id
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  fullWidth: {
    width: '100%',
  },
}));

export default function RecipeBookmarksList({ id, creator, name, urls }) {
  // prettier-ignore
  const [recipeBookmarksFormVisible, setRecipeBookmarksFormVisible] = useState(false);
  const [working, setWorking] = useState(false);
  const classes = useStyles();

  const [updateUserBookmarks] = useMutation(UPDATE_USER_BOOKMARKS);
  const [removeUserBookmarks] = useMutation(REMOVE_USER_BOOKMARKS);

  return (
    <>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <List className={classes.fullWidth}>
            {urls?.map((url, index) => (
              <ListItem
                button
                component={Link}
                color="inherit"
                href={url}
                target="_blank"
                key={`url-link-${index}`}
              >
                <ListItemIcon>
                  <LinkIcon />
                </ListItemIcon>
                <ListItemText primary={url} />
              </ListItem>
            ))}
          </List>
        </AccordionDetails>
        <AccordionActions>
          <EditButton
            size="small"
            pending={working}
            onClick={() => {
              console.debug(`Edit Recipe Bookmarks (${id})`);
              setWorking(true);
              setRecipeBookmarksFormVisible(true);
            }}
          />
          <DeleteButton
            size="small"
            pending={working}
            onClick={async () => {
              console.debug(`Delete Recipe Bookmarks (${id})`);
              setWorking(true);
              await removeUserBookmarks({ variables: { id } });
            }}
          />
        </AccordionActions>
      </Accordion>
      {recipeBookmarksFormVisible && (
        <RecipeBookmarksForm
          initialValues={{ name, urls }}
          onClose={() => setRecipeBookmarksFormVisible(false)}
          onSubmit={async (values) => {
            console.log('RecipeBookmarks', values);
            setWorking(true);
            try {
              await updateUserBookmarks({
                variables: { id, data: { ...values, creator } },
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
    </>
  );
}
