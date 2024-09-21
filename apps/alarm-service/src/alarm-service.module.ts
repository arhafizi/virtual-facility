import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AlarmsServiceController } from './alarm-service.controller';
import { NOTIFICATIONS_SERVICE } from './constants';
import { TracingModule } from '@app/tracing';
import { NatsClientModule } from '@app/tracing/nats-client/nats-client.module';

@Module({
    imports: [
        NatsClientModule,
        ClientsModule.register([
            {
                name: NOTIFICATIONS_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue: 'notifications-service',
                },
            },
        ]),
        TracingModule,
    ],
    controllers: [AlarmsServiceController],
})
export class AlarmServiceModule {}
