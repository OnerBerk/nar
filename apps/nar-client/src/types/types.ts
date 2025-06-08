import { RolesEnum } from './enum.ts';

// type pour les custom extra de toolkit
export interface ThunkExtra {
  toast: typeof import('react-toastify').toast;
  navigate: (path: string) => void;
}

export type RegisterType = {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
};

export type RegisterFormData = RegisterType & {
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
};

export type NarUser = {
  id: number;
  created_at: string;
  updated_at: string;
  lastname: string;
  firstname: string;
  email: string;
  roles: RolesEnum[];
  password: string;
  measurements: Measurements[];
};

export type Measurements = {
  id: number;
  date: string;
  weight: number;
  height: number;
  waist: number;
  thigh: number;
  arm: number;
  chest: number;
  hips: number;
  userId: number;
  created_at: string;
  updated_at: string;
};
