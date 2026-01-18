import {RolesEnum, SexEnum} from './global.types';
import {Measurements} from './measurements.types';

export type NarUser = {
  id: number;
  created_at: string;
  updated_at: string;
  lastname: string;
  firstname: string;
  email: string;
  roles: RolesEnum[];
  sex: SexEnum;
  password: string;
  measurements: Measurements[];
};
