import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch
} from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { WorkflowsService } from './workflows.service';

@Controller('workflows')
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) {}

    @MessagePattern('workflows.create') 
    create(@Payload() dto: CreateWorkflowDto) {
        return this.workflowsService.create(dto);
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
