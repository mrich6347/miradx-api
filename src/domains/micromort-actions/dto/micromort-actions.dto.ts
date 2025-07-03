import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsEnum } from 'class-validator';

// Enum for unit types to match database ENUM
export enum UnitType {
  MILE = 'mile',
  FLOOR = 'floor',
  MINUTE = 'minute',
  QUANTITY = 'quantity'
}

export class GetMicromortActionsQueryDto {
  @IsOptional()
  @IsEnum(UnitType)
  unit?: UnitType;

  @IsOptional()
  @IsString()
  action_name?: string;
}

export class MicromortActionResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'walked on sidewalk' })
  action_name: string;

  @ApiProperty({ enum: UnitType, example: 'mile' })
  unit: UnitType;

  @ApiProperty({ example: 0.5 })
  micromorts_per_unit: number;

  @ApiProperty({ example: 'Walking on a sidewalk - very low risk activity' })
  description: string;

  @ApiProperty({ example: '2025-01-03T10:30:00.000Z' })
  created_at: string;

  @ApiProperty({ example: '2025-01-03T10:30:00.000Z' })
  updated_at: string;
}

export class GetMicromortActionsResponseDto {
  @ApiProperty({ type: [MicromortActionResponseDto] })
  data: MicromortActionResponseDto[];

  @ApiProperty({ example: 25 })
  count: number;
}
