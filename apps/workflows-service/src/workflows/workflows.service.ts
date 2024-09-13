import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workflow } from './entities/workflow.entity';
import { CreateWorkflowDto, UpdateWorkflowDto } from '@app/workflows';

@Injectable()
export class WorkflowsService {
    constructor(
        @InjectRepository(Workflow)
        private readonly workflowsRepo: Repository<Workflow>,
    ) {}

    async findAll() {
        return this.workflowsRepo.find();
    }

    async findOne(id: number) {
        const workflow = await this.workflowsRepo.findOne({
            where: { id },
        });
        if (!workflow) {
            throw new NotFoundException(`Workflow #${id} does not exist`);
        }
        return workflow;
    }

    async create(dto: CreateWorkflowDto) {
        const workflow = this.workflowsRepo.create({
            ...dto,
        });
        const newWorkflowEntity = await this.workflowsRepo.save(workflow);
        console.log('Created WorkFlow ::: ', newWorkflowEntity);
        return newWorkflowEntity;
    }

    async update(id: number, dto: UpdateWorkflowDto) {
        const workflow = await this.workflowsRepo.preload({
            id: +id,
            ...dto,
        });

        if (!workflow) {
            throw new NotFoundException(`Workflow #${id} does not exist`);
        }
        return this.workflowsRepo.save(workflow);
    }

    async remove(id: number) {
        const workflow = await this.findOne(id);
        return this.workflowsRepo.remove(workflow);
    }
}
