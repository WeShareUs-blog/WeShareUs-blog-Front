import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { LoginScreen, SignupScreen } from '../screens';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
