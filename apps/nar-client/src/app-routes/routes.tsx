import {Route, Routes, useNavigate} from 'react-router-dom';
import AuthPage from '@/components/pages/auth/auth-page';
import PublicLayout from '@/components/layouts/public-layout.tsx';
import {setNavigator} from '@/utils/navigation/navigation.ts';
import HomePage from '@/components/pages/home-page/home-page';
import PrivateLayout from '@/components/layouts/private-layout';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/stores';
import {useEffect} from 'react';

const AppRoutes = () => {
  setNavigator(useNavigate());
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path='/auth' element={<AuthPage />} />
      </Route>
      {isAuthenticated && (
        <Route element={<PrivateLayout />}>
          <Route index element={<HomePage />} />
        </Route>
      )}
    </Routes>
  );
};
export default AppRoutes;
