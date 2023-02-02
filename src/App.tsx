import React from 'react';
import { AppRouter } from './routes';
import { theme, ThemeProvider } from './libs/theme';
import { queryClient, ReactQueryClientProvider } from './libs/react-query';

function App() {
  return (
    <ReactQueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </ReactQueryClientProvider>
  );
}

export default App;
