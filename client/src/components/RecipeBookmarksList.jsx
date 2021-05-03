import { Grid, Snackbar, Typography } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';
import { useQuery, gql } from '@apollo/client';
import RecipeBookmarksListItem from './RecipeBookmarksListItem';
import { useAuth } from '../contexts/AuthContext';

// TODO add error state

const USER_BOOKMARKS = gql`
  query UserRecipeBookmarks($creator: String!) {
    listRecipeBookmarksByCreator(creator: $creator) {
      id
      name
      urls
    }
  }
`;

export default function RecipeBookmarksList() {
  const { user } = useAuth();
  const { loading, error, data } = useQuery(USER_BOOKMARKS, {
    variables: {
      creator: user._id,
    },
    // would like to switch out to refetch call
    // potentially abstract queries and mutations into a context
    pollInterval: 5000,
  });

  if (error) console.error(error);

  return (
    <Grid container>
      <Grid item xs={12}>
        {loading && (
          <Snackbar open={loading}>
            <Alert variant="filled" severity="info">
              <AlertTitle>Loading Recipe Bookmarks</AlertTitle>
              This might take a moment.
            </Alert>
          </Snackbar>
        )}
        {loading &&
          Array(5)
            .fill(0)
            .map((_, index) => (
              <RecipeBookmarksListItem
                key={`recipeBookmarks-temporary-${index}`}
                name="Delicious Recipes Across the Internet"
              />
            ))}
        {!loading &&
          data?.listRecipeBookmarksByCreator?.map((bookmark) => (
            <RecipeBookmarksListItem
              key={`recipeBookmarks-${bookmark.id}`}
              {...bookmark}
              creator={user._id}
            />
          ))}
        {!loading && !data?.listRecipeBookmarksByCreator.length && (
          <Grid item>
            <Typography variant="subtitle1">
              Sorry, but there are no boxes here. How about you create one, and
              share something delicious.
            </Typography>
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
