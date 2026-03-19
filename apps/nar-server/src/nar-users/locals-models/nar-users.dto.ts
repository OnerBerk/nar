import {nar_user, RolesEnum, Measurements, SexEnum, ActivityLevelEnum} from '@prisma/client';
import {ApiProperty} from '@nestjs/swagger';
import {MeasurementsDto} from '../../measurements/local-models/measurements.dto';

export class NarUser implements nar_user {
  @ApiProperty({example: 1})
  id!: number;

  @ApiProperty({example: new Date()})
  created_at!: Date;

  @ApiProperty({example: new Date()})
  updated_at!: Date;

  @ApiProperty({example: new Date()})
  date_of_birth!: Date;

  @ApiProperty({example: 'Doe'})
  lastname!: string;

  @ApiProperty({example: 'John'})
  firstname!: string;

  @ApiProperty({example: 'john@example.com'})
  email!: string;

  @ApiProperty({example: 'john@example.com'})
  password!: string;

  @ApiProperty({isArray: true, enum: RolesEnum, example: [RolesEnum.Authenticated]})
  roles!: RolesEnum[];

  @ApiProperty({enum: SexEnum, example: SexEnum.Man})
  sex!: SexEnum;

  @ApiProperty({type: () => [MeasurementsDto]})
  measurements!: Measurements[];

  @ApiProperty({example: 1000, nullable: true})
  BMR!: number | null;

  @ApiProperty({example: 1000, nullable: true})
  TDEE!: number | null;

  @ApiProperty({enum: ActivityLevelEnum, example: ActivityLevelEnum.Sedentary})
  activity_level!: ActivityLevelEnum;
}
