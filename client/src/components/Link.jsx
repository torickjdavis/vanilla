import { makeStyles } from '@material-ui/core';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'var(--accent-color)',
    textDecoration: 'none',
    '&.active, &:focus, &:hover': {
      textDecoration: 'underline',
      textDecorationThickness: '0.2em',
      textUnderlineOffset: 0,
      // ? textDecorationSkipInk
    },
  },
  linkText: {
    color: theme.palette.primary.contrastText,
  },
}));

export default function Link({ children, className, ...routeOptions }) {
  const classes = useStyles();
  return (
    <RouterLink {...routeOptions} className={clsx(classes.link, className)}>
      <div className={classes.linkText}>{children}</div>
    </RouterLink>
  );
}

export function NavLink({ children, className, ...routeOptions }) {
  const classes = useStyles();
  return (
    <RouterNavLink {...routeOptions} className={clsx(classes.link, className)}>
      <div className={classes.linkText}>{children}</div>
    </RouterNavLink>
  );
}
