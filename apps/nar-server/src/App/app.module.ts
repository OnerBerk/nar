import { Module } from '@nestjs/common';
import { PrismaModule } from '../config/prisma/prisma.module';
import { UserModule } from '../nar-users/nar-users.module';
import { MeasurementsModule } from '../measurements/measurements.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, UserModule, MeasurementsModule, AuthModule],
})
export class AppModule {}
