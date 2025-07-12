import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from '@/components/pages/auth/auth-page';
import PublicLayout from '@/components/layouts/public-layout.tsx';
import {setNavigator} from '@/utils/navigation/navigation.ts';

const AppRoutes = () => {
  setNavigator(useNavigate());
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route index element={<AuthPage />} />
      </Route>
    </Routes>
  );
};
export default AppRoutes;
