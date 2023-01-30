import React from 'react';
import { Paper } from '@mui/material';
import { AppRouter } from './routes';
import { theme, ThemeProvider } from './libs/theme';
import { queryClient, ReactQueryClientProvider } from './libs/react-query';
import NightSky from './assets/night-sky.jpg';

function App() {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <Paper
          sx={{
            width: '100%',
            height: '100vh',
            backgroundImage: `url(${NightSky})`,
            backgroundAttachment: 'scroll',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
          }}
        >
          <AppRouter />
        </Paper>
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}

export default App;
