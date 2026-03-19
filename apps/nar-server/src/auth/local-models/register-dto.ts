import {nar_user, SexEnum} from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';
import {Type} from 'class-transformer';
import {IsDate, IsEmail, IsEnum, IsNotEmpty, Matches, MinLength} from 'class-validator';

export class RegisterDto implements Partial<nar_user> {
  @ApiProperty({example: 'one.bee@gmail.com', required: true})
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @ApiProperty({example: 'bee', required: true})
  firstname!: string;

  @IsNotEmpty()
  @ApiProperty({example: 'one', required: true})
  lastname!: string;

  @ApiProperty({example: 'Man', required: true})
  @IsNotEmpty()
  @IsEnum(SexEnum)
  sex!: SexEnum;

  @ApiProperty({example: '1990-01-01', required: true})
  @IsNotEmpty()
  @IsDate({message: 'DATE_OF_BIRTH_MUST_BE_A_VALID_DATE'})
  @Type(() => Date)
  date_of_birth!: Date;

  @ApiProperty({example: 'jeSuis1pass!', required: true})
  @IsNotEmpty()
  @MinLength(8)
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'The password must contain at least one uppercase letter,' +
      'one lowercase letter, one digit, one special character among @, #, $, %, ^, &, +, =, !, and be a minimum of 8 characters in length.',
  })
  password!: string;
}
