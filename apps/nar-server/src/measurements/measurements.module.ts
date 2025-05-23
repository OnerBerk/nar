import { Module } from '@nestjs/common';
import { MeasurementsController } from './measurement.controller';
import { MeasurementsService } from './measurements.service';

@Module({
  controllers: [MeasurementsController],
  providers: [MeasurementsService],
})
export class MeasurementsModule {}
