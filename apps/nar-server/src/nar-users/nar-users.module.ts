import { userController } from './nar-users.controller';
import { UserService } from './nar-users.service';
import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [userController],
  providers: [UserService],
})
export class UserModule {}