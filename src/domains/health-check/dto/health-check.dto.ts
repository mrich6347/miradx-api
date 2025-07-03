import { ApiProperty } from '@nestjs/swagger';

export class HealthCheckResponseDto {
  @ApiProperty({
    description: 'Server status',
    example: 'ok'
  })
  status: string;
  
  @ApiProperty({
    description: 'Current server timestamp',
    example: '2025-01-03T10:30:00.000Z'
  })
  timestamp: string;
  
  @ApiProperty({
    description: 'Server uptime in seconds',
    example: 123.456
  })
  uptime: number;
}
