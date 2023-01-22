import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { PublicLayout } from '../components';
import { LOGIN_PATH } from './const';
import { LoginScreen } from '../screens';

function PublicRoute() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN_PATH} element={<LoginScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
