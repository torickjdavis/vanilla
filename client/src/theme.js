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

export function colorHash(string) {
  // inspired by https://github.com/mui-org/material-ui/issues/12700#issuecomment-416869593
  // potentially should memoize?

  const hash = string
    .split('')
    .map((s) => s.charCodeAt(0))
    .reduce((hash, code) => code + ((hash << 5) - hash), 0);

  let color = '#';

  // loop three times; rgb
  for (let i = 0; i < 3; i++) {
    const value = (hash >> (i * 8)) & 0xff;
    color += value.toString(16).padStart(2, '0'); // base-16
  }

  return color;
}
