import { Body, Controller, Get, Param, Post, Query, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDTO, DeviceAdafruitDto } from './dto';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}

  @UseGuards(AuthGuard)
  @Post('sendData')
  async sendData(@Body() device : DeviceAdafruitDto) {
    return this.devicesService.sendData(device);
  }

  @UseGuards(AuthGuard)
  @Post('addDevice')
  async addDevice(@Body() device: CreateDeviceDTO) {
    return this.devicesService.addDevice(device);
  }

  @UseGuards(AuthGuard)
  @Get('getListDevices')
  async getListDevices(
    @Query('pageOffset') pageOffset: number = 1, 
    @Query('limit') limit: number = 10
  ) {
    return this.devicesService.getListDevices(+pageOffset, +limit);
  }
}
