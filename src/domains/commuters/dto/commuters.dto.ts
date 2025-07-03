import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class GetCommutersQueryDto {
  @IsOptional()
  @IsString()
  commuter_id?: string;

  @IsOptional()
  @IsString()
  name?: string;
}

export class CommuterResponseDto {
  @ApiProperty({ example: 'COM-123' })
  commuter_id: string;

  @ApiProperty({ example: 'John Doe' })
  name: string;

  @ApiProperty({ example: 'john.doe@example.com' })
  email: string;

  @ApiProperty({ example: '2025-01-03T10:30:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2025-01-03T10:30:00.000Z' })
  updated_at: string;
}

export class GetCommutersResponseDto {
  @ApiProperty({ type: [CommuterResponseDto] })
  data: CommuterResponseDto[];

  @ApiProperty({ example: 3 })
  count: number;
}
