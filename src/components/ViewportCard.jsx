import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
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
  actions,
  children,
}) {
  return (
    <ViewportGrid backgroundImageURL="/assets/gaelle-marcel-qMIGJmx41EM-unsplash.jpg">
      <Grid item>
        <Card>
          <CardHeader title={title} subheader={subheader} />
          <CardContent>
            <Typography>{children}</Typography>
          </CardContent>
          <CardActions>
            <CancelButton />
            {actions}
          </CardActions>
        </Card>
      </Grid>
    </ViewportGrid>
  );
}
