import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Outbox } from './entities/outbox.entity';

@Injectable()
export class OutboxService {
    constructor(
        @InjectRepository(Outbox)
        private readonly outboxRepo: Repository<Outbox>,
    ) {}

    async getUnprocessedMessages(options: {
        target: string;
        take: number;
    }): Promise<Outbox[]> {
        return this.outboxRepo.find({
            where: {
                target: options.target,
            },
            order: {
                createdAt: 'ASC',
            },
            take: options.take,
        });
    }
}
