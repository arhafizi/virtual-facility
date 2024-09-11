import { NestFactory } from '@nestjs/core';
import { AlarmServiceModule } from './alarm-service.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AlarmServiceModule);
    app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.NATS,
            options: {
                servers: [process.env.NATS_URL],
                queue: 'alarms-service',
            },
        },
        { inheritAppConfig: true },
    );
    await app.startAllMicroservices();
    await app.listen(3000);
}
bootstrap();
