import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom';
import { LOGIN_PATH, MAIN_PATH } from './const';
import { LoginScreen } from '../screens';

function PublicRoute() {
  return <Outlet />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN_PATH} element={<LoginScreen />} />
          <Route path={MAIN_PATH} element={<div>main</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
