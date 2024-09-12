import { Module } from '@nestjs/common';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';

@Module({
    imports: [],
    controllers: [AlarmsClassifierServiceController],
})
export class AlarmsClassifierServiceModule {}
