import React, { useCallback } from 'react';
import { useAppDispatch } from '@/hooks/use-app-dispatch.ts';
import { login } from '@/redux/modules/auth/auth.actions.ts';
import { LoginFormData } from '@/types/types.ts';
import LoginForm from '../forms/login-form.tsx';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();

  const loginSubmit = useCallback(
    (data: LoginFormData) => {
      dispatch(login({ email: data.email, password: data.password }));
    },
    [dispatch],
  );

  return <LoginForm onSubmit={loginSubmit} />;
};

export default Login;
