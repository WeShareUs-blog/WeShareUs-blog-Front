import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from 'react-router-dom';
import { LOGIN_PATH } from './const';
import { LoginScreen, SignupScreen, TodoScreen } from '../screens';

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
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
          <Route path="/:user/*" element={<PrivateRoute />}>
            <Route path="todo" element={<TodoScreen />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
