import { createMuiTheme } from '@material-ui/core';

export default createMuiTheme({
  // https://material.io/resources/color/#!/?view.left=0&view.right=0&primary.color=212121&secondary.color=5D4037
  palette: {
    type: 'dark',
    primary: {
      light: '#484848',
      main: '#212121',
      dark: '#000000',
    },
    secondary: {
      light: '#5b3f36',
      main: '#896a60',
      dark: '#301810',
    },
  },
});
