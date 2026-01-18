import {Route, Routes, useNavigate, Outlet} from 'react-router-dom';
import AuthPage from '@/components/pages/auth/auth-page';
import PublicLayout from '@/components/layouts/public-layout.tsx';
import {setNavigator} from '@/utils/navigation/navigation.ts';
import HomePage from '@/components/pages/home-page/home-page';
import PrivateLayout from '@/components/layouts/private-layout';
import MeasurementsListPage from '@/components/pages/measurements/measurements-list-page';
import CreateMeasurementPage from '@/components/pages/measurements/create-measurement-page';
import {useSelector} from 'react-redux';
import {RootState} from '@/redux/stores';
import {useEffect} from 'react';

const AppRoutes = () => {
  setNavigator(useNavigate());
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state: RootState) => state.auth);
  const user = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    } else {
      if (!user?.measurements || user?.measurements.length === 0) {
        navigate('/measurements/create');
      } else {
        navigate('/');
      }
    }
  }, [isAuthenticated, navigate, user]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path='/auth' element={<AuthPage />} />
      </Route>
      {isAuthenticated && (
        <Route element={<PrivateLayout />}>
          <Route index element={<HomePage />} />
          <Route path='measurements' element={<Outlet />}>
            <Route index element={<MeasurementsListPage />} />
            <Route path='create' element={<CreateMeasurementPage />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
};
export default AppRoutes;
