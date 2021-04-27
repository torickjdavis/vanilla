import { Skeleton } from '@material-ui/lab';
import {
  Card,
  CardHeader,
  makeStyles,
  CardContent,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
}));

export default function SkeletonCard({ avatar = false, media = false }) {
  const classes = useStyles();
  return (
    <Card>
      <CardHeader
        avatar={
          avatar ? (
            <Skeleton
              animation="wave"
              variant="circle"
              width={40}
              height={40}
            />
          ) : null
        }
        title={
          <Typography>
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              className={classes.text}
            />
          </Typography>
        }
        subheader={<Skeleton animation="wave" height={10} width="40%" />}
      />
      {media && (
        <Skeleton animation="wave" variant="rect" className={classes.media} />
      )}
      <CardContent>
        <Typography>
          <Skeleton animation="wave" height={10} className={classes.text} />
          <Skeleton animation="wave" height={10} width="80%" />
        </Typography>
      </CardContent>
    </Card>
  );
}
