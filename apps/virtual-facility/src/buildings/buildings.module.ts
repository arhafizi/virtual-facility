import { Module } from '@nestjs/common';
import { BuildingsService } from './buildings.service';
import { BuildingsController } from './buildings.controller';
import { Building } from './entities/building.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { WORKFLOWS_SERVICE } from './constants';

@Module({
    imports: [
        TypeOrmModule.forFeature([Building]),
        ClientsModule.register([
            {
                name: WORKFLOWS_SERVICE,
                transport: Transport.RMQ,
                options: {
                    urls: [process.env.RMQ_URL],
                    queue : 'workflows-service',
                    // socketOptions: {
                    //     heartbeatIntervalInSeconds : 10,
                    // }
                },


            },
        ]),
    ],
    controllers: [BuildingsController],
    providers: [BuildingsService],
})
export class BuildingsModule {}
