import RecipeBookmarksList from '../components/RecipeBookmarksList';
import { Typography } from '@material-ui/core';
export default function RecipeBookmarksContent() {
  return (
    <>
      <Typography variant="h2" paragraph>
        Recipe Bookmarks
      </Typography>
      <RecipeBookmarksList />
    </>
  );
}
