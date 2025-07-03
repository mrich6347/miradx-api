import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { HealthCheckResponseDto } from '../dto/health-check.dto';

export function ApiHealthCheck() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Determine if server is up and running',
      description: 'Returns the current status of the server including uptime and timestamp. This endpoint is used for health monitoring and load balancer checks.'
    }),
    ApiResponse({ 
      status: 200,
      description: 'Server is healthy and operational',
      type: HealthCheckResponseDto
    })
  );
}
