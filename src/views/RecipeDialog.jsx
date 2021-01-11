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

import RoutedModal, { useInModal } from '../components/RoutedModal';
import ViewportCard from '../components/ViewportCard';

import { useRecipes } from '../contexts/RecipeContext';

import { useRouterViewParams } from './RouterView';
import routes from '../routes';
import { useState } from 'react';

import { colorHash } from '../theme';

import DOMPurify from 'dompurify';

const useStyles = (imageURL) =>
  makeStyles((theme) => ({
    viewportCardContent: {
      // mimic dialog options
      width: 'calc(100% - 64px)',
      maxWidth: theme.breakpoints.values.lg,
    },
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
  const { recipes } = useRecipes();
  const params = useRouterViewParams(routes);
  const id = Number(params.id);

  const [tabIndex, setTabIndex] = useState(0);

  const recipe = recipes?.find((b) => b.id === id); // intentional similarity instead of identity

  const {
    // * overview data
    title,
    image,
    // * source data
    sourceName,
    // sourceUrl,
    // * detail information
    summary,
    analyzedInstructions,
    extendedIngredients,
    // * tags to display as pills/chips
    // cuisines,
    // dishTypes,
    // occasions,
  } = recipe || {};

  const classes = useStyles(image);
  const theme = useTheme();
  const avatarBackground = colorHash(sourceName);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6} className={classes.picture}>
          <div className={classes.creator}>
            <Card>
              <CardHeader
                title={title}
                avatar={
                  <Avatar
                    title={sourceName}
                    style={{
                      background: avatarBackground,
                      color: theme.palette.getContrastText(avatarBackground),
                    }}
                  >
                    {
                      // first letter of each word in name
                      sourceName
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
              <Typography className={classes.summary}>
                <div
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(summary),
                  }}
                />
              </Typography>
            )}
            {tabIndex === 1 && (
              <List>
                {analyzedInstructions.map(({ steps }) =>
                  steps.map(({ step, number }) => (
                    <ListItem>
                      <ListItemText primary={`${number}. ${step}`} />
                    </ListItem>
                  ))
                )}
              </List>
            )}
            {tabIndex === 2 && (
              <List>
                {extendedIngredients.map(({ originalString }) => (
                  <ListItem>
                    <ListItemText primary={originalString} />
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
  const classes = useStyles();
  const inModal = useInModal();
  if (inModal) {
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

  return (
    <ViewportCard
      title="Recipe Details"
      hasCancel={false}
      disablePadding
      className={classes.viewportCardContent}
    >
      <RecipeDetails />
    </ViewportCard>
  );
}
