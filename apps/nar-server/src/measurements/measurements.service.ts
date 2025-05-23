import { Injectable } from '@nestjs/common';
import { Measurements } from '@prisma/client';
import { CreateMeasurementDto } from './local-models/create-measurement.dto';
import { PrismaService } from '../config/prisma/prisma.service';

@Injectable()
export class MeasurementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateMeasurementDto): Promise<Measurements> {
    return this.prisma.measurements.create({ data: dto });
  }

  findByUser(userId: number): Promise<Measurements[]> {
    return this.prisma.measurements.findMany({ where: { userId } });
  }
}
