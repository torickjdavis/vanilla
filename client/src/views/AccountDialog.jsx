import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from '@material-ui/core';
import RoutedModal from '../components/RoutedModal';
import { useAuth } from '../contexts/AuthContext';

function AccountInformation() {
  // TODO add stats, ability to change email and password

  const { user } = useAuth();
  console.log(user);
  const fullName = `${user?.name.first} ${user?.name.last}`;
  return (
    <List>
      <ListItem disableGutters>
        <ListItemAvatar>
          <Avatar src={user?.picture} alt={fullName} />
        </ListItemAvatar>
        <ListItemText primary={fullName} secondary={user?.email} />
      </ListItem>
    </List>
  );
}

export default function AccountDialog() {
  return (
    <RoutedModal
      title="Account Information"
      closeActionText="Close"
      dialogOptions={{ fullWidth: true, maxWidth: 'md' }}
    >
      <AccountInformation />
    </RoutedModal>
  );
}
