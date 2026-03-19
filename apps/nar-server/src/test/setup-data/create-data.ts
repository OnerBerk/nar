import {ActivityLevelEnum, nar_user, RolesEnum} from '@prisma/client';
import {prisma} from '../../config/prisma/prisma';

type NarUserCreateInputOverride = Partial<Omit<nar_user, 'id' | 'created_at' | 'updated_at'>>;

export async function createUser(prefix: string, customData?: NarUserCreateInputOverride) {
  return prisma.nar_user.create({
    data: {
      activity_level: ActivityLevelEnum.Sedentary,
      date_of_birth: new Date('1990-01-01'),
      firstname: `${prefix}_John`,
      lastname: `${prefix}_Doe`,
      email: `${prefix}@test.com`,
      roles: [RolesEnum.Authenticated],
      password: 'HBHBHBH',
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
