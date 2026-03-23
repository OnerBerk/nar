import {useEffect} from 'react';
import {Route, Routes, useNavigate, Outlet} from 'react-router-dom';
import {RootState} from '@/redux/stores';

import {setNavigator} from '@/utils/navigation/navigation.ts';
import {useSelector} from 'react-redux';

import PublicLayout from '@/components/layouts/public-layout.tsx';
import PrivateLayout from '@/components/layouts/private-layout.tsx';

import CreateMeasurementPage from '@/components/pages/measurements/create-measurement-page';
import MeasurementsPage from '@/components/pages/measurements/measurements-page';
import HomePage from '@/components/pages/home-page/home-page';
import StatsPage from '@/components/pages/stats/stats-page';
import AuthPage from '@/components/pages/auth/auth-page';

const AppRoutes = () => {
  setNavigator(useNavigate());
  const navigate = useNavigate();

  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
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
          <Route path='stats' element={<StatsPage />} />
          <Route path='measurements' element={<Outlet />}>
            <Route path='list' element={<MeasurementsPage />} />
            <Route path='create' element={<CreateMeasurementPage />} />
          </Route>
        </Route>
      )}
    </Routes>
  );
};
export default AppRoutes;
