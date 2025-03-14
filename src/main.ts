import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const httpApp = await NestFactory.create(AppModule);
  await httpApp.listen(process.env.PORT || 8080);

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.MQTT,
    options: {
      url: `${process.env.MQTT_URL}:${process.env.MQTT_PORT}`,
      username: process.env.MQTT_USERNAME,
      password: process.env.MQTT_PASSWORD,
    },
  });

  await app.listen();
}
bootstrap();
