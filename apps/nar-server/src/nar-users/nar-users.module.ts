import { userController } from './nar-users.controller';
import { UserService } from './nar-users.service';
import { Module } from '@nestjs/common';

@Module({
  controllers: [userController],
  providers: [UserService],
})
export class UserModule {}