import { Module } from '@nestjs/common';
import { AlarmsServiceController } from './alarm-service.controller';

@Module({
    imports: [],
    controllers: [AlarmsServiceController],
})
export class AlarmServiceModule {}
