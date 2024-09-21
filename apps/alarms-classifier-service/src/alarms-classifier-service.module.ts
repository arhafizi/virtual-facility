import { Module } from '@nestjs/common';
import { AlarmsClassifierServiceController } from './alarms-classifier-service.controller';
import { TracingModule } from '@app/tracing';

@Module({
    imports: [TracingModule],
    controllers: [AlarmsClassifierServiceController],
})
export class AlarmsClassifierServiceModule {}
