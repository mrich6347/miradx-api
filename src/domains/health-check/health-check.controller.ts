import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HealthCheckResponseDto } from './dto/health-check.dto';
import { ApiHealthCheck } from './api-swagger-decorators/health-check';

@ApiTags('Server Health Check')
@Controller('health')
export class HealthCheckController {
  @Get()
  @ApiHealthCheck()
  healthCheck(): HealthCheckResponseDto {
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  }
}
