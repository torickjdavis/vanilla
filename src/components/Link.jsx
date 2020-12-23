import { makeStyles } from '@material-ui/core';
import { Link as RouterLink, NavLink as RouterNavLink } from 'react-router-dom';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  link: {
    color: 'var(--accent-color)',
    textDecoration: 'none',
    '&.active, &:focus, &:hover': {
      textDecoration: 'underline',
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
  console.log(routeOptions);
  return (
    <RouterNavLink {...routeOptions} className={clsx(classes.link, className)}>
      <div className={classes.linkText}>{children}</div>
    </RouterNavLink>
  );
}
