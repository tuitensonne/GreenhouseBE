import { Body, Controller, Get, Post } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { DeviceAdafruitDto } from './dto';

@Controller('devices')
export class DevicesController {
  constructor(private readonly devicesService: DevicesService) {}


  @Post('sendDataToAda')
  async sendData(@Body() devicesDto : DeviceAdafruitDto) {
    return this.devicesService.sendData(devicesDto);
  }
}
