import { Module } from '@nestjs/common';
import { NotificationsServiceController } from './notifications-service.controller';

@Module({
    imports: [],
    controllers: [NotificationsServiceController],
})
export class NotificationsServiceModule {}
