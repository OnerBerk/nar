import {SexEnum} from './global.types';

export type RegisterType = {
  firstname: string;
  lastname: string;
  email: string;
  sex: SexEnum;
  password: string;
};

export type RegisterFormData = RegisterType & {
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};
