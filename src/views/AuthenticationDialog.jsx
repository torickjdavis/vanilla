import { Grid, makeStyles } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import RoutedModal from '../components/RoutedModal';

const useStyles = makeStyles((theme) => {});

export default function AuthenticationDialog() {
  const classes = useStyles();
  const location = useLocation();
  const query = new URLSearchParams(location.search);

  return (
    <RoutedModal>
      <Grid container>
        <Grid item>Authentication Dialog - Login &amp; Registration</Grid>
      </Grid>
    </RoutedModal>
  );
}
