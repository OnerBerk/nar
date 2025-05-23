import { RolesEnum } from '@prisma/client';
import { IsArray, IsDefined, IsEmail, IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
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

  @ApiProperty({ example: 72000, required: false })
  @IsOptional()
  @IsInt({ message: 'WEIGHT_MUST_BE_AN_INTEGER' })
  weight?: number;

  @ApiProperty({ example: 170, required: false })
  @IsOptional()
  @IsInt({ message: 'HEIGHT_MUST_BE_AN_INTEGER' })
  height?: number;

  @ApiProperty({ example: 80, required: false })
  @IsOptional()
  @IsInt({ message: 'WAIST_MUST_BE_AN_INTEGER' })
  waist?: number;

  @ApiProperty({ example: 60, required: false })
  @IsOptional()
  @IsInt({ message: 'THIGH_MUST_BE_AN_INTEGER' })
  thigh?: number;

  @ApiProperty({ example: 30, required: false })
  @IsOptional()
  @IsInt({ message: 'ARM_MUST_BE_AN_INTEGER' })
  arm?: number;

  @ApiProperty({ example: 90, required: false })
  @IsOptional()
  @IsInt({ message: 'CHEST_MUST_BE_AN_INTEGER' })
  chest?: number;

  @ApiProperty({ example: 95, required: false })
  @IsOptional()
  @IsInt({ message: 'HIPS_MUST_BE_AN_INTEGER' })
  hips?: number;

  @ApiProperty({ isArray: true, enum: RolesEnum, required: false })
  @IsOptional()
  @IsArray({ message: 'ROLES_MUST_BE_AN_ARRAY' })
  @IsEnum(RolesEnum, { each: true, message: 'ROLES_MUST_BE_A_VALID_ENUM' })
  roles?: RolesEnum[];
}
