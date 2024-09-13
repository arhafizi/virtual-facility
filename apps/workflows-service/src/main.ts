import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());

    app.connectMicroservice<MicroserviceOptions>(
        {
            transport: Transport.RMQ,
            options: {
                urls: [process.env.RMQ_URL],
                queue: 'workflows-service',
            },
        },
        { inheritAppConfig: true },
    );
    await app.startAllMicroservices();

    await app.listen(3001);
}
bootstrap();
