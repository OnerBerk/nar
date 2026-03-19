import {Injectable} from '@nestjs/common';
import {ActivityLevelEnum, Measurements, SexEnum} from '@prisma/client';
import {CreateMeasurementDto} from './local-models/create-measurement.dto';
import {PrismaService} from '../config/prisma/prisma.service';
import {calculateAge, calculateBMR, calculateTDEE} from '../utils/utils';

@Injectable()
export class MeasurementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(
    dto: CreateMeasurementDto & {userId: number; sex: SexEnum; date_of_birth: Date; activity_level: ActivityLevelEnum}
  ): Promise<Measurements> {
    const age = calculateAge(dto.date_of_birth);
    const bmr = calculateBMR(dto.height, dto.weight, age, dto.sex);
    const tdee = calculateTDEE(bmr, dto.activity_level);

    return this.prisma.$transaction(async (tx) => {
      await tx.nar_user.update({
        where: {id: dto.userId},
        data: {BMR: bmr, TDEE: tdee},
      });
      return tx.measurements.create({
        data: {
          date: dto.date,
          weight: dto.weight,
          height: dto.height,
          belly_waist: dto.belly_waist,
          hip_waist: dto.hip_waist,
          thigh: dto.thigh,
          arm: dto.arm,
          chest: dto.chest,
          userId: dto.userId,
        },
      });
    });
  }

  findByUser(userId: number): Promise<Measurements[]> {
    return this.prisma.measurements.findMany({where: {userId}});
  }
}
