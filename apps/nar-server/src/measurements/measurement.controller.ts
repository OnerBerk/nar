import {Controller, Get, Post, Body, Param, UseGuards, Request} from '@nestjs/common';
import {Measurements} from '@prisma/client';
import {ApiBearerAuth, ApiOkResponse, ApiTags} from '@nestjs/swagger';
import {MeasurementsDto} from './local-models/measurements.dto';
import {CreateMeasurementDto} from './local-models/create-measurement.dto';
import {MeasurementsService} from './measurements.service';
import {AuthGuard} from '@nestjs/passport';

@ApiTags('Measurements')
@Controller('measurements')
export class MeasurementsController {
  constructor(private readonly measurementsService: MeasurementsService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Post()
  @ApiOkResponse({type: MeasurementsDto})
  create(@Body() dto: CreateMeasurementDto, @Request() req: {user?: {userId: number}}): Promise<Measurements> {
    const userId = req.user?.userId;
    if (!userId) {
      throw new Error('User not authenticated');
    }
    return this.measurementsService.create({...dto, userId});
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth()
  @Get('user/:userId')
  @ApiOkResponse({type: MeasurementsDto, isArray: true})
  findByUser(@Param('userId') userId: string): Promise<Measurements[]> {
    return this.measurementsService.findByUser(+userId);
  }
}
