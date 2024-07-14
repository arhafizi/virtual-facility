import { Module } from '@nestjs/common';
import { WorkflowsServiceController } from './wf-service.controller';
import { WorkflowsModule } from './workflows/workflows.module';

@Module({
    imports: [WorkflowsModule],
    controllers: [WorkflowsServiceController],
    providers: [],
})
export class WorkflowsServiceModule {}
