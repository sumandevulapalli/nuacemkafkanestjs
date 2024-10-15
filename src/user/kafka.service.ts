import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { Kafka } from 'kafkajs';

@Injectable()
export class KafkaService {
    sendMessage(topic, message) {
        const kafka = new Kafka({
            clientId: 'my-app',
            brokers: ['localhost:9092']
        })

        const producer = kafka.producer()
        const run = async () => {
            await producer.connect()
            await producer.send({
                topic: topic,
                messages: [
                    { value: JSON.stringify(message) },
                ],
            })
        }

        run();


    }

}
