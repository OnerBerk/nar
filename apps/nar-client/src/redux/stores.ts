import { configureStore } from '@reduxjs/toolkit';
import authReducer from './modules/auth/auth.slice.ts';
import { toast } from 'react-toastify';
import { navigate } from '../utils/navigation/navigation.ts';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          toast,
          navigate,
        },
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
