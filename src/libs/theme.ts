import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          paddingLeft: '8px',
          paddingRight: '0px',
        },
        input: {
          padding: '12px 8px',
        },
      },
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: {
          marginRight: '0px',
        },
      },
    },
    MuiIconButton: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableRipple: true,
      },
      styleOverrides: {
        root: {
          color: '#000',
          fontWeight: 600,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderWidth: '2px',
          '&::before': {
            borderWidth: '2px',
            borderTop: 'thin solid rgba(255, 255, 255)',
          },
          '&::after': {
            borderWidth: '2px',
            borderTop: 'thin solid rgba(255, 255, 255)',
          },
        },
      },
    },
  },
  spacing: 4,
});

export { theme, ThemeProvider };
