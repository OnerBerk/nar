import { RolesEnum } from '@prisma/client';
import { IsArray, IsDefined, IsEmail, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateNarUserDto {
  @ApiProperty({ example: 'John' })
  @IsDefined({ message: 'FIRSTNAME_IS_REQUIRED' })
  @IsString({ message: 'FIRSTNAME_MUST_BE_A_STRING' })
  firstname!: string;

  @ApiProperty({ example: 'Doe' })
  @IsDefined({ message: 'LASTNAME_IS_REQUIRED' })
  @IsString({ message: 'LASTNAME_MUST_BE_A_STRING' })
  lastname!: string;

  @ApiProperty({ example: 'john@example.com' })
  @IsDefined({ message: 'EMAIL_IS_REQUIRED' })
  @IsEmail({}, { message: 'EMAIL_IS_INVALID' })
  email!: string;

  @ApiProperty({ isArray: true, enum: RolesEnum, required: false })
  @IsOptional()
  @IsArray({ message: 'ROLES_MUST_BE_AN_ARRAY' })
  @IsEnum(RolesEnum, { each: true, message: 'ROLES_MUST_BE_A_VALID_ENUM' })
  roles?: RolesEnum[];
}
