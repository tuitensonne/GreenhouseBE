import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MqttService } from './mqtt/mqtt.service';
import { DevicesModule } from './devices/devices.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  controllers: [AppController],
  imports: [DevicesModule,MqttModule],
})
export class AppModule {}
