import {createTheme} from '@mui/material';

export const font = {
  light: 300,
  regular: 400,
  medium: 500,
  dark: 600,
  bold: 700,
};

export function setupTheme() {
  const palette = {
    primary: {
      main: '#1D1D1D',
      dark: '#090909',
      light: '#333331',
    },
    secondary: {
      main: '#A3BCB6',
      dark: '#3C403D',
      light: '#DADED4',
    },
    text: {
      primary: '#3C403D',
      secondary: '#f6fefc',
      disabled: '#999999',
    },
    background: {
      default: '#A3BCB6',
      paper: '#F8FAFC',
    },
    error: {
      main: '#E64848',
    },
  };

  return createTheme({
    palette,
    shape: {
      borderRadius: 10,
    },
    typography: {
      fontFamily: 'karla, sans-serif',
      htmlFontSize: 16,
      fontWeightLight: font.light,
      fontWeightRegular: font.regular,
      fontWeightMedium: font.medium,
      fontWeightBold: font.bold,
      h1: {
        fontSize: '10rem',
        fontWeight: font.dark,
      },
      h2: {
        fontSize: '2.7rem',
        fontWeight: font.dark,
      },
      h3: {
        fontSize: '2.5rem',
        fontWeight: font.medium,
      },
      body1: {
        fontSize: '1.4rem',
        fontWeight: font.regular,
      },
      body2: {
        fontSize: '1.2rem',
        fontWeight: font.regular,
      },
      subtitle1: {
        fontSize: '1.25rem',
        fontWeight: font.medium,
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            cursor: 'pointer',
            paddingTop: 2,
            paddingBottom: 2,
            paddingLeft: 10,
            paddingRight: 10,
            color: palette.text.primary,
            '&:hover': {
              backgroundColor: palette.text.primary,
              color: palette.text.secondary,
            },
          },
        },
        defaultProps: {
          variant: 'outlined',
        },
      },
    },
  });
}
