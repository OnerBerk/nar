export interface ThunkExtra {
  toast: typeof import('react-toastify').toast;
  navigate: (path: string) => void;
}

export enum RolesEnum {
  Authenticated = 'Authenticated',
  Admin = 'Admin',
  Ops = 'Ops',
}

export enum SexEnum {
  Man = 'Man',
  Woman = 'Woman',
}

export enum ActivityLevelEnum {
  Sedentary = 'Sedentary',
  Light = 'Light',
  Moderate = 'Moderate',
  Intense = 'Intense',
}
