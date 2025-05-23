import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserModule } from '../nar-users/nar-users.module';

@Module({
  imports: [PrismaModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
