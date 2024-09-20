import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';
import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { InboxService } from '../inbox/inbox.service';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
    constructor(
        private readonly workflowsService: WorkflowsService,
        private readonly inboxService: InboxService,
    ) {}

    @EventPattern('workflows.create')
    async create(
        @Payload() dto: CreateWorkflowDto,
        @Ctx() context: RmqContext,
    ) {
        const message = context.getMessage();
        const messageId = context.getMessage().properties.headers['messageId'];
        console.log('id is : ',messageId);
        console.log(dto);

        await this.inboxService.createInboxMessage(
            messageId,
            context.getPattern(),
            dto,
        );

        const channel = context.getChannelRef();
        channel.ack(message);
    }

    @Get()
    findAll() {
        return this.workflowsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.workflowsService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() dto: UpdateWorkflowDto) {
        return this.workflowsService.update(+id, dto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.workflowsService.remove(+id);
    }
}
