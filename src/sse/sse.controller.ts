import { Controller, Get, Sse, MessageEvent, Query } from '@nestjs/common';
import { MqttService } from 'src/mqtt/mqtt.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Controller('sse')
export class SseController {
    constructor(private readonly mqttService: MqttService) {}

    @Get('data')
    @Sse()
    sendEvents(@Query("greenhouse") greenhouseId: string): Observable<MessageEvent> { 
        return this.mqttService.getEvents(+greenhouseId).pipe(
            map((data) => ({
                data: JSON.stringify(data)
            }))
        );
    } 
}
