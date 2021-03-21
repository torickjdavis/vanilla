import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  IconButton,
  makeStyles,
  Collapse,
} from '@material-ui/core';
import { ExpandMore as ExpandMoreIcon } from '@material-ui/icons';
import clsx from 'clsx';
import { useEffect } from 'react';
import useToggle from '../hooks/useToggle';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function ErrorInfo({ error }) {
  const classes = useStyles();
  const { state: isExpanded, toggle: toggleExpanded } = useToggle(false);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Card>
      <CardHeader
        title="An Error Ocurred"
        subheader="Something went wrong with a request or action. Sorry for the
          inconvenience."
        action={
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: !isExpanded,
            })}
            onClick={toggleExpanded}
            aria-expanded={isExpanded}
            aria-label="Show More"
          >
            <ExpandMoreIcon />
          </IconButton>
        }
      />
      <Collapse in={isExpanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography>Message: {error.message}</Typography>
          <Typography color="error" component="pre">
            {error?.stack}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
