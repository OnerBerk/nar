import { INestApplication } from '@nestjs/common';
import { setupApiTest } from '../../test/setup-data/setup-api-test';
import { clearUsers, createUsers } from '../../test/setup-data/create-data';
import { testWithGet } from '../../test/setup-data/api-request';
import { nar_user } from '@prisma/client';

describe('UserController – find', () => {
  let app: INestApplication;
  const prefix = 'find-users';

  beforeAll(async () => {
    app = await setupApiTest();
    await createUsers(prefix, 3);
  });

  afterAll(async () => {
    await clearUsers(prefix);
    await app.close();
  });

  it('should return all users including the test users', async () => {
    const res = await testWithGet('/users');
    const matched = res.body.filter((u: nar_user) => u.email?.startsWith(prefix));
    expect(matched.length).toBe(3);
  });
});
