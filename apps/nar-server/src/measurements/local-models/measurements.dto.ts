import { Measurements } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class MeasurementsDto implements Measurements {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: new Date() })
  created_at!: Date;

  @ApiProperty({ example: new Date() })
  updated_at!: Date;

  @ApiProperty({ example: new Date() })
  @Type(() => Date)
  date!: Date;

  @ApiProperty({ example: 72500 })
  weight!: number;

  @ApiProperty({ example: 170 })
  height!: number;

  @ApiProperty({ example: 80 })
  waist!: number;

  @ApiProperty({ example: 60 })
  thigh!: number;

  @ApiProperty({ example: 30 })
  arm!: number;

  @ApiProperty({ example: 90 })
  chest!: number;

  @ApiProperty({ example: 95 })
  hips!: number;

  @ApiProperty({ example: 1 })
  userId!: number;
}
