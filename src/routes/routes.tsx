import {
  BrowserRouter,
  Navigate,
  Outlet,
  Route,
  Routes,
} from 'react-router-dom';
import {
  KakaoAuthScreen,
  LoginScreen,
  SignupScreen,
  TodoScreen,
} from '../screens';
import { Header } from '../components';
import { getStorage } from '../libs/storage';
import { LOGIN_PATH, SIGNUP_PATH } from './const';

function PrivateRoute() {
  const auth = getStorage('token', 'local');
  const account = getStorage('account', 'local');

  return auth && account ? (
    <>
      <Header account={account} />
      <Outlet />
    </>
  ) : (
    <Navigate to={LOGIN_PATH} />
  );
}

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LOGIN_PATH} element={<LoginScreen />} />
        <Route path="/login/kakao" element={<KakaoAuthScreen />} />
        <Route path={SIGNUP_PATH} element={<SignupScreen />} />
        <Route path="/:user/*" element={<PrivateRoute />}>
          <Route path="todo" element={<TodoScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export { AppRouter };
