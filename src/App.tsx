import React from 'react';
import { AppRouter } from './routes';
import { theme, ThemeProvider } from './libs/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
