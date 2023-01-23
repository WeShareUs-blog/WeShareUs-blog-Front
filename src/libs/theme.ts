import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        input: {
          padding: '8px 12px',
          backgroundColor: '#FFF',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          padding: '0px',
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: '#000',
          '&:hover': {
            backgroundColor: 'inherit',
          },
        },
      },
    },
  },
});

export { theme, ThemeProvider };
