import { Controller, Get } from '@nestjs/common';

@Controller()
export class WorkflowsServiceController {
    constructor() {}

    @Get()
    getHello(): string {
        return 'Hello World!';
    }
}
