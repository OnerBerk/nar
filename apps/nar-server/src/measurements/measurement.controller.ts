import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { Measurements } from '@prisma/client';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { MeasurementsDto } from './local-models/measurements.dto';
import { CreateMeasurementDto } from './local-models/create-measurement.dto';
import { MeasurementsService } from './measurements.service';

@ApiTags('Measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @Post()
  @ApiOkResponse({ type: MeasurementsDto })
  create(@Body() dto: CreateMeasurementDto): Promise<Measurements> {
    return this.measurementsService.create(dto);
  }

  @Get('user/:userId')
  @ApiOkResponse({ type: MeasurementsDto, isArray: true })
  findByUser(@Param('userId') userId: string): Promise<Measurements[]> {
    return this.measurementsService.findByUser(+userId);
  }
}
