import { NestFactory } from '@nestjs/core';
import { WorkflowsServiceModule } from './wf-service.module';

async function bootstrap() {
    const app = await NestFactory.create(WorkflowsServiceModule);
    await app.listen(3001);
}
bootstrap();
