import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  makeStyles,
} from '@material-ui/core';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';

import ViewportGrid from '../components/ViewportGrid';

const useStyles = makeStyles((theme) => ({
  disablePadding: {
    padding: 0,

    '&:last-child': {
      padding: 0,
    },
  },
}));

const CancelButton = () => {
  const history = useHistory();
  return <Button onClick={() => history.goBack()}>Cancel</Button>;
};

export default function ViewportCard({
  title,
  subheader = '',
  actions = null,
  children,
  hasCancel = true,
  disablePadding = false,
  className = null,
}) {
  const classes = useStyles();
  return (
    <ViewportGrid backgroundImageURL="/assets/gaelle-marcel-qMIGJmx41EM-unsplash.jpg">
      <Grid item className={className}>
        <Card>
          <CardHeader title={title} subheader={subheader} />
          <CardContent
            className={clsx({ [classes.disablePadding]: disablePadding })}
          >
            {children}
          </CardContent>
          {(actions || hasCancel) && (
            <CardActions>
              {hasCancel && <CancelButton />}
              {actions}
            </CardActions>
          )}
        </Card>
      </Grid>
    </ViewportGrid>
  );
}
