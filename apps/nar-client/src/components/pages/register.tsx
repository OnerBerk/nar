import React, { useCallback } from 'react';
import RegisterForm from '../forms/register-form.tsx';
import { RegisterFormData } from '../../types/types.ts';
import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { register } from '../../redux/modules/auth/auth.actions.ts';

const Register: React.FC = () => {
  const dispatch = useAppDispatch();

  const registerSubmit = useCallback(
    (data: RegisterFormData) => {
      dispatch(
        register({
          firstname: data.firstname,
          lastname: data.lastname,
          email: data.email,
          password: data.password,
        }),
      );
    },
    [dispatch],
  );
  return <RegisterForm onSubmit={registerSubmit} />;
};
export default Register;
