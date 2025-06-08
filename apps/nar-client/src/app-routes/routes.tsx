import { Route, Routes, useNavigate } from 'react-router-dom';
import HomePage from '@/components/pages/home-page.tsx';
import Register from '@/components/pages/register.tsx';
import Login from '@/components/pages/login.tsx';
import PublicLayout from '@/components/layouts/public-layout.tsx';
import { setNavigator } from '@/utils/navigation/navigation.ts';

const AppRoutes = () => {
  setNavigator(useNavigate());
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
