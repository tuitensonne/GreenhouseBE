import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreateDeviceDTO, DeviceAdafruitDto } from './dto';
import { MqttService } from 'src/mqtt/mqtt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class DevicesService {
    constructor(private readonly mqttService: MqttService,
        private readonly prisma: PrismaService
    ) {
        this.subscribeToDevice();
    }

    async sendData(devicesDto: DeviceAdafruitDto) {
        await this.getDevice(devicesDto.topic)
        await this.mqttService.sendDataToAdafruit(devicesDto.topic, devicesDto.value);
        return { message: 'Data sent to Adafruit IO!' };
    }

    async addDevice(deviceDto: CreateDeviceDTO) {
        try {
            var device;
            if (deviceDto.deviceType === 'sensor') {
                device = await this.prisma.sensor.create({
                    data: {
                        maxValue: deviceDto.maxValue,
                        sensorType: deviceDto.sensorType,
                        
                        topic: deviceDto.topic,
                        deviceType: deviceDto.deviceType,
                        greenHouse: {
                            connect: { GID: deviceDto.greenHouseId }
                        },
                        user: {
                            connect: { ID: deviceDto.userId }
                        }
                    }
                });
            } else if (deviceDto.deviceType === 'controller') {
                device = await this.prisma.controller.create({
                    data: {
                        status: deviceDto.status,
                        controllerType: deviceDto.controllerType,
                        value: deviceDto.value,

                        topic: deviceDto.topic,
                        deviceType: deviceDto.deviceType,
                        greenHouse: {
                            connect: { GID: deviceDto.greenHouseId }
                        },
                        user: {
                            connect: { ID: deviceDto.userId }
                        }
                    }
                });
            }
        }  catch (error) { 
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ConflictException('Topic has been used');
                }
            }
            console.error(error);
            throw new InternalServerErrorException("An error occurred! Please try again.");
        }

        this.mqttService.subscribeToDeviceData(deviceDto.topic);
        return device;
    }

    // async getListDevices(pageOffset: number , limit: number) {
    //     const totalRecord = await this.prisma.controller.count()
    //     const totalPages = Math.ceil(totalRecord/ limit)
    //     const listOfDevices = await this.prisma.controller.findMany({
    //         select: {
    //             CID: true,
    //             deviceType: true,
    //             status: true,
    //             controllerType: true
    //         },
    //         skip: (pageOffset - 1)*limit,
    //         take: limit
    //     })

    //     return {
    //         data: listOfDevices,
    //         pagination: {
    //             currentPage: pageOffset,
    //             totalPages: totalPages,
    //             totalItems: totalRecord,
    //             limit: limit,
    //           },
    //     }
    // }

    async subscribeToDevice() {
        const devices = await this.prisma.sensor.findMany({
            select: {
                topic: true
            }
        });
        for (const device of devices) {
            this.mqttService.subscribeToDeviceData(device.topic);
        }
    }
    
    async getDevice(topic: string) {
        const device = await this.prisma.controller.findUnique({
            where: { topic: topic }
        });
        if (!device) {
            throw new NotFoundException("Topic doesn't exist");
        }
        return device
    }
}
