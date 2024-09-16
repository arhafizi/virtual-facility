import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AlarmsServiceController } from './alarm-service.controller';
import { NATS_MESSAGE_BROKER, NOTIFICATIONS_SERVICE } from './constants';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: NATS_MESSAGE_BROKER,
                transport: Transport.NATS,
                options: {
                    servers: [process.env.NATS_URL],
                },
            },
            {
                name: NOTIFICATIONS_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: 'notifications-service',
                },
            },
        ]),
    ],
    controllers: [AlarmsServiceController],
})
export class AlarmServiceModule {}
