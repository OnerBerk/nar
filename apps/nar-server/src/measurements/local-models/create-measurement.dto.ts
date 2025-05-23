import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsDefined, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateMeasurementDto {
  @ApiProperty({ example: new Date() })
  @IsDefined({ message: 'DATE_IS_REQUIRED' })
  @IsDate({ message: 'DATE_MUST_BE_A_VALID_DATE' })
  @Type(() => Date)
  date!: Date;

  @ApiProperty({ example: 72000 })
  @IsDefined({ message: 'WEIGHT_IS_REQUIRED' })
  @IsInt({ message: 'WEIGHT_MUST_BE_AN_INTEGER' })
  weight!: number;

  @ApiProperty({ example: 170 })
  @IsDefined({ message: 'HEIGHT_IS_REQUIRED' })
  @IsInt({ message: 'HEIGHT_MUST_BE_AN_INTEGER' })
  height!: number;

  @ApiProperty({ example: 80 })
  @IsDefined({ message: 'WAIST_IS_REQUIRED' })
  @IsInt({ message: 'WAIST_MUST_BE_AN_INTEGER' })
  waist!: number;

  @ApiProperty({ example: 60 })
  @IsDefined({ message: 'THIGH_IS_REQUIRED' })
  @IsInt({ message: 'THIGH_MUST_BE_AN_INTEGER' })
  thigh!: number;

  @ApiProperty({ example: 30 })
  @IsDefined({ message: 'ARM_IS_REQUIRED' })
  @IsInt({ message: 'ARM_MUST_BE_AN_INTEGER' })
  arm!: number;

  @ApiProperty({ example: 90 })
  @IsDefined({ message: 'CHEST_IS_REQUIRED' })
  @IsInt({ message: 'CHEST_MUST_BE_AN_INTEGER' })
  chest!: number;

  @ApiProperty({ example: 95 })
  @IsDefined({ message: 'HIPS_IS_REQUIRED' })
  @IsInt({ message: 'HIPS_MUST_BE_AN_INTEGER' })
  hips!: number;

  @ApiProperty({ example: 1 })
  @IsDefined({ message: 'USER_ID_IS_REQUIRED' })
  @IsInt({ message: 'USER_ID_MUST_BE_AN_INTEGER' })
  userId!: number;
}
