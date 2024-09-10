import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBuildingDto } from './dto/create-building.dto';
import { UpdateBuildingDto } from './dto/update-building.dto';
import { Building } from './entities/building.entity';
import { CreateWorkflowDto } from '@app/workflows';
import { WORKFLOWS_SERVICE } from './constants';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class BuildingsService {
    constructor(
        @InjectRepository(Building)
        private readonly buildingsRepo: Repository<Building>,
        @Inject(WORKFLOWS_SERVICE)
        private readonly workflowsService: ClientProxy,
    ) {}

    async findAll() {
        return this.buildingsRepo.find();
    }

    async findOne(id: number) {
        const building = await this.buildingsRepo.findOne({
            where: { id },
        });
        if (!building) {
            throw new NotFoundException(`Building #${id} does not exist`);
        }
        return building;
    }

    async create(dto: CreateBuildingDto) {
        const building = this.buildingsRepo.create({
            ...dto,
        });
        const newBuildingEntity = await this.buildingsRepo.save(building);

        // Create a workflow for the new building
        await this.createWorkflow(newBuildingEntity.id);
        return newBuildingEntity;
    }

    async update(id: number, dto: UpdateBuildingDto) {
        const building = await this.buildingsRepo.preload({
            id: +id,
            ...dto,
        });

        if (!building) {
            throw new NotFoundException(`Building #${id} does not exist`);
        }
        return this.buildingsRepo.save(building);
    }

    async remove(id: number) {
        const building = await this.findOne(id);
        return this.buildingsRepo.remove(building);
    }

    async createWorkflow(buildingId: number) {
        const newWorkflow = await lastValueFrom(
            this.workflowsService.send('workflows.create', {
                name: 'My Workflow',
                buildingId,
            } as CreateWorkflowDto),
        );
        console.log({ newWorkflow });
        return newWorkflow;
    }
}
