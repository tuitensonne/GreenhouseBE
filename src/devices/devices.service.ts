import { Injectable } from '@nestjs/common';
import { DeviceAdafruitDto } from './dto';
import { MqttService } from 'src/mqtt/mqtt.service';

@Injectable()
export class DevicesService {
    constructor(private readonly mqttService: MqttService) {}
    
    async sendData(devicesDto: DeviceAdafruitDto) {
        await this.mqttService.sendDataToAdafruit(devicesDto.deviceFeed,  devicesDto.value);
        return { message: 'Data sent to Adafruit IO!' };
    }
}
