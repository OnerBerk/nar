import {createTheme} from '@mui/material';

declare module '@mui/material/styles' {
  interface TypeBackground {
    pomegranate: string;
  }
}

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
      main: '#A3BCB6',
      dark: '#3C403D',
      light: '#DADED4',
    },
    secondary: {
      main: '#af3c43',
      dark: '#752b2e',
      light: '#FFB38E',
    },
    text: {
      primary: '#3C403D',
      secondary: '#f6fefc',
      disabled: '#999999',
    },
    background: {
      default: '#A3BCB6',
      paper: '#F8FAFC',
      pomegranate: '#FAEEF0',
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
      fontFamily: '"FrenchTea", "Miskan", karla, sans-serif',
      htmlFontSize: 25,
      body1: {fontSize: 25},
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          root: {
            fontSize: 25,
          },
        },
      },
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
