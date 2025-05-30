import { Controller, Get } from '@nestjs/common';
import {
    HealthCheckService,
    TypeOrmHealthIndicator,
    HealthCheck,
} from '@nestjs/terminus';

@Controller('health')
export class HealthController {
    constructor(
        private readonly health: HealthCheckService,
        private readonly db: TypeOrmHealthIndicator,
    ) {}

    @HealthCheck()
    @Get()
    isHealthy() {
        return this.health.check([() => this.db.pingCheck('database')]);
    }
}
