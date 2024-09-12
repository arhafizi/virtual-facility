import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AlarmsServiceController } from './alarm-service.controller';
import { MESSAGE_BROKER } from './constants';

@Module({
    imports: [
        ClientsModule.register([
            {
                name: MESSAGE_BROKER,
                transport: Transport.NATS,
                options: {
                    servers: [process.env.NATS_URL],

                },
            },
        ]),
    ],
    controllers: [AlarmsServiceController],
})
export class AlarmServiceModule {}
