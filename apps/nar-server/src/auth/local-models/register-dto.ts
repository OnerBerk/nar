import { nar_user, RolesEnum } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';

export class RegisterDto implements Partial<nar_user> {
  @ApiProperty({ example: 'one.bee@gmail.com', required: true })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'bee', required: true })
  firstname!: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'one', required: true })
  lastname!: string;

  @ApiProperty({ example: 'jeSuis1pass!', required: true })
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password must contain at least one uppercase letter,' +
      'one lowercase letter, one digit, one special character among @, #, $, %, ^, &, +, =, !, and be a minimum of 8 characters in length.',
  })
  password!: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Admin | Authenticated', enum: RolesEnum })
  role!: RolesEnum[];
}
