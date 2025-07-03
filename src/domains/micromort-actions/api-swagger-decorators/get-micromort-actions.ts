import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetMicromortActionsResponseDto, UnitType } from '../dto/micromort-actions.dto';

export function ApiGetMicromortActions() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Get all micromort actions in the system with optional filtering',
      description: 'Retrieve all micromort actions from the system. You can filter by unit type and/or action name. If no filters are provided, all actions are returned.'
    }),
    ApiQuery({
      name: 'unit',
      required: false,
      enum: UnitType,
    }),
    ApiQuery({
      name: 'action_name',
      required: false,
      type: String,
      description: 'Filter by action name (partial match, case-insensitive)'
    }),
    ApiResponse({ 
      status: 200,
      description: 'Successfully retrieved micromort actions',
      type: GetMicromortActionsResponseDto
    })
  );
}
