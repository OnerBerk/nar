import { nar_user, RolesEnum, Measurements } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { MeasurementsDto } from '../../measurements/local-models/measurements.dto';

export class NarUser implements nar_user {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: new Date() })
  created_at!: Date;

  @ApiProperty({ example: new Date() })
  updated_at!: Date;

  @ApiProperty({ example: 'Doe' })
  lastname!: string;

  @ApiProperty({ example: 'John' })
  firstname!: string;

  @ApiProperty({ example: 'john@example.com' })
  email!: string;

  @ApiProperty({ example: 'john@example.com' })
  password!: string;

  @ApiProperty({ isArray: true, enum: RolesEnum, example: [RolesEnum.Authenticated] })
  roles!: RolesEnum[];

  @ApiProperty({ type: () => [MeasurementsDto] })
  measurements!: Measurements[];
}
