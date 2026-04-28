import { createTheme } from '@mui/material/styles';

const commonThemeOptions = {
  typography: {
    fontFamily: ['Space Grotesk', 'Oxygen', 'sans-serif'].join(','),
    h1: {
      fontFamily: ['Space Grotesk', 'Oxygen', 'sans-serif'].join(','),
      fontSize: '2rem',
      fontWeight: 600,
    },
    h2: {
      fontFamily: ['Space Grotesk', 'Oxygen', 'sans-serif'].join(','),
      fontSize: '1.75rem',
      fontWeight: 600,
    },
    h3: {
      fontFamily: ['Space Grotesk', 'Oxygen', 'sans-serif'].join(','),
      fontSize: '1.5rem',
      fontWeight: 600,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 700,
    },
    h5: {
      fontSize: '1rem',
      fontWeight: 700,
    },
    h6: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      lineHeight: 1.5,
      letterSpacing: '0.5px',
    },

    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      lineHeight: 1.4,
      letterSpacing: '0.2px',
    },
  },
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  MuiDialog: {
    styleOverrides: {
      paper: {
        backgroundImage: 'none',
      },
    },
  },
  MuiPopover: {
    styleOverrides: {
      paper: {
        backgroundImage: 'none',
      },
    },
  },
};

const lightTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'light',
    primary: {
      main: 'rgb(33, 81, 245)',
      dark: 'rgb(15, 46, 170)',
      light: 'rgb(0, 212, 255)',
    },
    secondary: {
      main: 'rgb(0, 212, 255)',
    },
    background: {
      default: 'rgb(245, 248, 252)',
      paper: 'rgb(255, 255, 255)',
    },
    text: {
      primary: 'rgb(13, 28, 51)',
      secondary: 'rgb(53, 85, 122)',
    },
  },
});

const darkTheme = createTheme({
  ...commonThemeOptions,
  palette: {
    mode: 'dark',
    primary: {
      main: 'rgb(0, 212, 255)',
      dark: 'rgb(33, 81, 245)',
      light: 'rgb(238, 238, 240)',
    },
    secondary: {
      main: 'rgb(0, 255, 136)',
    },
    background: {
      default: 'rgb(3, 9, 19)',
      paper: 'rgb(7, 19, 37)',
    },
    text: {
      primary: 'rgb(235, 246, 255)',
      secondary: 'rgb(157, 194, 228)',
    },
  },
});

export { lightTheme, darkTheme };
