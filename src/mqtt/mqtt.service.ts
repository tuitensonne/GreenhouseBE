import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import * as mqtt from 'mqtt';

@Injectable()
export class MqttService implements OnModuleDestroy {
  private client: mqtt.MqttClient;
  
  constructor() {
    this.client = mqtt.connect('mqtts://io.adafruit.com', {
      port: Number(process.env.MQTT_PORT),
      username: process.env.MQTT_USERNAME, 
      password: process.env.MQTT_PASSWORD, 
    });

    this.client.on('connect', () => {
      console.log('✅ Connected to Adafruit IO MQTT');
    });

    this.client.on('error', (err) => {
      console.error('❌ MQTT Error:', err);
    });

    this.client.on('message', (topic, message) => {
      const data = message.toString();
      console.log(`📥 Received from ${topic}: ${data}`);
    });
  }

  async sendDataToAdafruit(feed: string, value: string) {
    const topic = `${process.env.ADAFRUIT_TOPIC}/${feed}`;
    this.client.publish(topic, value, (err) => {
      if (err) {
        console.error('❌ Error publishing to MQTT:', err);
      } else {
        console.log(`🚀 Published to ${topic}: ${value}`);
      }
    });
  }

  // private subscribeToDeviceData(feed: string) {
  //   const topic = `${process.env.ADAFRUIT_TOPIC}/${feed}`;
  //   this.client.subscribe(topic, (err) => {
  //     if (err) {
  //       console.error('❌ Error subscribing:', err);
  //     } else {
  //       console.log(`📌 Subscribed to ${topic}`);
  //     }
  //   });
  // }

  onModuleDestroy() {
    this.client.end();
  }
}
