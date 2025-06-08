import { nar_user } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto implements Partial<nar_user> {
  @ApiProperty({ example: 'one.bee@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  password!: string;
}
