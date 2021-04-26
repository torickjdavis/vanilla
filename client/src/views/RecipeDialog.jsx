import {
  List,
  ListItem,
  ListItemText,
  Typography,
  makeStyles,
  Grid,
  Tabs,
  Tab,
  Paper,
  Card,
  CardHeader,
  Avatar,
  useTheme,
} from '@material-ui/core';

import RoutedModal from '../components/RoutedModal';

import { useRecipes } from '../contexts/RecipeContext';
import { useUsers } from '../contexts/UserContext';

import { useRouterViewParams } from './RouterView';
import routes from '../routes';
import { useState } from 'react';

import { colorHash } from '../theme';

import DOMPurify from 'dompurify';

const useStyles = (imageURL) =>
  makeStyles((theme) => ({
    tabs: {
      background: theme.palette.secondary.dark,
    },
    tabContent: {
      background: theme.palette.primary.main,
      flex: 1,
      padding: theme.spacing(2),
    },
    picture: {
      position: 'relative',
      // height: 0,
      paddingTop: '56.25%', // 16:9
      background: theme.palette.primary.main,
      '&::before': {
        content: '""',
        position: 'absolute',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
        // prettier-ignore
        background: `url("${imageURL}")`,
        backgroundSize: 'cover',
        // backgroundAttachment: 'fixed',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        opacity: 0.75,
      },
    },
    creator: {
      position: 'absolute',
      top: 0,
      right: 0,
      left: 0,
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    details: {
      display: 'flex',
      flexDirection: 'column',
    },
    summary: {
      '& a': {
        color: theme.palette.getContrastText(theme.palette.primary.main),

        '&:hover': {
          color: 'var(--accent-color)',
        },
      },
    },
  }))();

function RecipeDetails() {
  const {
    all: { recipes },
  } = useRecipes();
  const { users } = useUsers();
  const params = useRouterViewParams(routes);
  const id = params.id;

  const [tabIndex, setTabIndex] = useState(0);

  const recipe = recipes?.find((r) => r._id === id); // intentional similarity instead of identity

  const {
    // * overview data
    created,
    title,
    image,
    summary,
    directions,
    ingredients,
  } = recipe || {};

  const user = users?.find((u) => u._id === created?.by);

  const classes = useStyles(image);
  const theme = useTheme();
  const avatarBackground = colorHash(user?._id || '');
  const fullname = `${user?.name.first} ${user?.name.last}`;

  return (
    <>
      <Grid container className="fill-height">
        <Grid item xs={12} md={6} className={classes.picture}>
          <div className={classes.creator}>
            <Card>
              <CardHeader
                title={title}
                subheader={`By: ${fullname}`}
                avatar={
                  <Avatar
                    title={fullname}
                    src={user?.picture}
                    alt={fullname}
                    style={{
                      background: avatarBackground,
                      color: theme.palette.getContrastText(avatarBackground),
                    }}
                  >
                    {
                      // first letter of each word in name
                      fullname
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                    }
                  </Avatar>
                }
              />
            </Card>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className={classes.details}>
          <Paper className={classes.tabs} square>
            <Tabs
              value={tabIndex}
              onChange={(event, value) => setTabIndex(value)}
              centered
            >
              <Tab label="Summary" />
              <Tab label="Instructions" />
              <Tab label="Ingredients" />
            </Tabs>
          </Paper>
          <Paper className={classes.tabContent} square>
            {tabIndex === 0 && (
              <Typography className={classes.summary} component="div">
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(summary),
                  }}
                />
              </Typography>
            )}
            {tabIndex === 1 && (
              <List dense>
                {directions.map(({ step, details, _id }, index) => (
                  <ListItem key={_id}>
                    <ListItemText
                      primary={`${index + 1}. ${step}`}
                      secondary={details}
                    />
                  </ListItem>
                ))}
              </List>
            )}
            {tabIndex === 2 && (
              <List dense>
                {ingredients.map(({ name, quantity, unit, _id }) => (
                  <ListItem key={_id}>
                    <ListItemText
                      primary={name}
                      secondary={`${quantity} ${unit}`}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}

export default function RecipeDialog() {
  return (
    <RoutedModal
      title="Recipe Details"
      dialogOptions={{ fullWidth: true, maxWidth: 'lg', scroll: 'paper' }}
      disablePadding
    >
      <RecipeDetails />
    </RoutedModal>
  );
}
