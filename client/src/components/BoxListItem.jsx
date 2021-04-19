import {
  IconButton,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';

import {
  ChevronRight as ChevronRightIcon,
  Edit as EditIcon,
  Inbox as BoxIcon,
} from '@material-ui/icons';

export default function BoxListItem({
  _id,
  name,
  recipes = [],
  description = '',
}) {
  return (
    <ListItem button>
      <ListItemIcon>
        <BoxIcon />
      </ListItemIcon>
      <ListItemText
        primary={name}
        secondary={`${recipes.length} Recipes${
          description ? `: ${description}` : ''
        }`}
      />
      <ListItemSecondaryAction>
        <IconButton>
          <ChevronRightIcon />
        </IconButton>
        <IconButton
          onClick={(e) => {
            e.preventDefault();
            console.log(`Edit Box (${_id})`);
          }}
        >
          <EditIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}
