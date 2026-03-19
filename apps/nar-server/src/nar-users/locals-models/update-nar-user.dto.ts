import {ActivityLevelEnum} from '@prisma/client';
import {IsEnum, IsOptional, IsString} from 'class-validator';
import {ApiProperty} from '@nestjs/swagger';

export class UpdateNarUserDto {
  @ApiProperty({example: 'John'})
  @IsOptional()
  @IsString({message: 'FIRSTNAME_MUST_BE_A_STRING'})
  firstname?: string;

  @ApiProperty({example: 'Doe'})
  @IsOptional()
  @IsString({message: 'LASTNAME_MUST_BE_A_STRING'})
  lastname?: string;

  @ApiProperty({example: 'john@example.com'})
  @IsOptional()
  @IsEnum(ActivityLevelEnum)
  activity_level?: ActivityLevelEnum;
}
