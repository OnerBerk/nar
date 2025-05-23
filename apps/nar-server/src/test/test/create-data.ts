import { nar_user, RolesEnum } from '@prisma/client';
import { prisma } from '../../config/prisma/prisma';

type NarUserCreateInputOverride = Partial<Omit<nar_user, 'id' | 'created_at' | 'updated_at'>>;

export async function createUser(prefix: string, customData?: NarUserCreateInputOverride) {
  return prisma.nar_user.create({
    data: {
      firstname: `${prefix}_John`,
      lastname: `${prefix}_Doe`,
      email: `${prefix}@test.com`,
      roles: [RolesEnum.Authenticated],
      weight: 72500,
      height: 175,
      waist: 80,
      thigh: 60,
      arm: 30,
      chest: 90,
      hips: 95,
      ...customData,
    },
  });
}

export async function createUsers(prefix: string, count = 3, customData?: NarUserCreateInputOverride) {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push(await createUser(`${prefix}_${i}`, customData));
  }
  return users;
}
{
  /* example of use
    await createUsers(prefix, 3);
    or
    await createUsers('test', 2, [
      { roles: ['Admin'], email: 'a@example.com' },
      { roles: ['Authenticated'], email: 'b@example.com' },
    ]);
  */
}

export async function clearUser(prefix: string) {
  await prisma.nar_user.deleteMany({
    where: {
      email: {
        startsWith: `${prefix}`,
      },
    },
  });
}

export async function clearUsers(prefix: string) {
  await prisma.nar_user.deleteMany({
    where: {
      email: {
        startsWith: `${prefix}`,
      },
    },
  });
}
