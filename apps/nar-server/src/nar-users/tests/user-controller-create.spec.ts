import { INestApplication } from '@nestjs/common';
import { setupApiTest } from '../../test/setup-data/setup-api-test';
import { testWithPost } from '../../test/setup-data/api-request';
import { clearUsers } from '../../test/setup-data/create-data';
import { RolesEnum } from '@prisma/client';

describe('UserController – POST /users (API)', () => {
  let app: INestApplication;
  const prefix = 'create-user';

  beforeAll(async () => {
    app = await setupApiTest();
  });

  afterAll(async () => {
    await clearUsers(prefix);
    await app.close();
  });

  const validPayload = {
    firstname: 'John',
    lastname: 'Doe',
    email: `${prefix}@test.com`,
    roles: [RolesEnum.Authenticated],
    weight: 72000,
    height: 170,
    waist: 80,
    thigh: 60,
    arm: 30,
    chest: 90,
    hips: 95,
  };

  const createUserValidationCases: [string, object, string][] = [
    ['lastname is missing', { lastname: undefined }, 'LASTNAME_IS_REQUIRED'],
    ['firstname is missing', { firstname: undefined }, 'FIRSTNAME_IS_REQUIRED'],
    ['email is missing', { email: undefined }, 'EMAIL_IS_REQUIRED'],
    ['email is invalid', { email: 'not-an-email' }, 'EMAIL_IS_INVALID'],
    ['roles is not array', { roles: RolesEnum.Admin }, 'ROLES_MUST_BE_AN_ARRAY'],
    ['roles contains invalid value', { roles: ['INVALID'] }, 'ROLES_MUST_BE_A_VALID_ENUM'],
  ];

  function expectValidationError(res: any, expectedMessage: string) {
    expect(res.status).toBe(400);
    expect(res.body.message).toEqual(expect.arrayContaining([expect.stringContaining(expectedMessage)]));
  }

  it('should create user successfully', async () => {
    const res = await testWithPost('/users', validPayload);
    expect(res.status).toBe(201);
    expect(res.body.email).toBe(validPayload.email);
  });

  it.each(createUserValidationCases)('should fail if %s', async (_, override, expectedMessage) => {
    const res = await testWithPost('/users', { ...validPayload, ...override });
    expectValidationError(res, expectedMessage);
  });
});
