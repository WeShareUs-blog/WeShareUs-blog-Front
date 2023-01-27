import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { LOGIN_PATH, MAIN_PATH } from './const';
import { LoginScreen, TodoScreen } from '../screens';

function PublicRoute() {
  return <Outlet />;
}

function PrivateRoute() {
  const auth = localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to={LOGIN_PATH} />;
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path={LOGIN_PATH} element={<LoginScreen />} />
          <Route path={MAIN_PATH} element={<div>main</div>} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="todos" element={<TodoScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
