import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsArray, ValidateNested, IsEnum, IsNumber, IsDateString, Min } from 'class-validator';
import { Type } from 'class-transformer';

// Enum for unit types to match database ENUM
export enum UnitType {
  MILE = 'mile',
  FLOOR = 'floor',
  MINUTE = 'minute',
  QUANTITY = 'quantity'
}

export class ActionDto {
  @ApiProperty({ 
    example: '2022-01-01 10:05:11',
    description: 'Timestamp of the action (must be same day for all actions)'
  })
  @IsDateString()
  timestamp: string;

  @ApiProperty({ 
    example: 'walked on sidewalk',
    description: 'Name of the action performed'
  })
  @IsString()
  action: string;

  @ApiProperty({ 
    enum: UnitType,
    example: 'mile',
    description: 'Unit type for the action'
  })
  @IsEnum(UnitType)
  unit: UnitType;

  @ApiProperty({ 
    example: 0.4,
    description: 'Quantity of the action performed',
    minimum: 0
  })
  @IsNumber()
  @Min(0)
  quantity: number;
}

export class CreateRiskAssessmentDto {
  @ApiProperty({ 
    example: 'COM-123',
    description: 'Unique identifier for the commuter'
  })
  @IsString()
  commuterId: string;

  @ApiProperty({ 
    type: [ActionDto],
    description: 'Array of actions performed by the commuter'
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ActionDto)
  actions: ActionDto[];
}

export class RiskAssessmentResponseDto {
  @ApiProperty({ 
    example: 'COM-123',
    description: 'Unique identifier for the commuter'
  })
  commuterId: string;

  @ApiProperty({
    example: 7.75,
    description: 'Calculated risk in micromorts (rounded to 2 decimal places)'
  })
  risk: number;
}
