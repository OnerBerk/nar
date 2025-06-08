import * as process from 'process';

export const authConstants = {
  secret:
    process.env.JWT_SECRET ??
    (() => {
      throw new Error('JWT_SECRET not defined');
    })(),
  expire:
    process.env.JWT_EXPIRES_IN ??
    (() => {
      throw new Error('JWT_EXPIRES_IN not defined');
    })(),
};
