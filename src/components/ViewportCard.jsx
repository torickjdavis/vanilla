import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
} from '@material-ui/core';

import { useHistory } from 'react-router-dom';

import ViewportGrid from '../components/ViewportGrid';

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
}) {
  return (
    <ViewportGrid backgroundImageURL="/assets/gaelle-marcel-qMIGJmx41EM-unsplash.jpg">
      <Grid item>
        <Card>
          <CardHeader title={title} subheader={subheader} />
          <CardContent>{children}</CardContent>
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
