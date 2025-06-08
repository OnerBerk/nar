import { Body, Controller, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.services';
import { RegisterDto } from './local-models/register-dto';
import { LoginDto } from './local-models/login-dto';
import { NarUser } from '../nar-users/locals-models/nar-users.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('/register')
  async register(@Body() registerAuthDto: RegisterDto) {
    return await this.authService.register(registerAuthDto);
  }

  @ApiOkResponse({
    description: 'Login user',
    type: NarUser,
  })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
}
