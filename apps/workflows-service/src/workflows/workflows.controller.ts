import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { WorkflowsService } from './workflows.service';
import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';

@Controller('workflows')
export class WorkflowsController {
    constructor(private readonly workflowsService: WorkflowsService) {}

    @Post()
    create(@Body() dto: CreateWorkflowDto) {
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
