import { Route, Routes } from 'react-router-dom';
import HomePage from '../pages/home-page.tsx';
import Register from '../pages/register.tsx';
import AuthLayout from '../layouts/auth-layout.tsx';

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route index element={<HomePage />} />
        {/*<Route path="login" element={<Login />} />*/}
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
