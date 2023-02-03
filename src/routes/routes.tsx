import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import { LoginScreen, SignupScreen, TodoScreen } from '../screens';
import { Header } from '../components';

function PrivateRoute() {
  const auth = localStorage.getItem('token');

  return auth ? (
    <>
      <Header />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/signup" element={<SignupScreen />} />
        <Route path="/:user/*" element={<PrivateRoute />}>
          <Route path="todo" element={<TodoScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
