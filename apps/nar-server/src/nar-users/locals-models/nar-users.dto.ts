import { nar_user, RolesEnum, weighing } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class NarUserDto implements nar_user {
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

  @ApiProperty({ example: 72500, required: false })
  weight!: number | null;

  @ApiProperty({ example: 170, required: false })
  height!: number | null;

  @ApiProperty({ example: 80, required: false })
  waist!: number | null;

  @ApiProperty({ example: 60, required: false })
  thigh!: number | null;

  @ApiProperty({ example: 30, required: false })
  arm!: number | null;

  @ApiProperty({ example: 90, required: false })
  chest!: number | null;

  @ApiProperty({ example: 95, required: false })
  hips!: number | null;

  @ApiProperty({ isArray: true, enum: RolesEnum, example: [RolesEnum.Authenticated] })
  roles!: RolesEnum[];

  @ApiProperty({ required: false })
  weighing!: weighing[];
}
