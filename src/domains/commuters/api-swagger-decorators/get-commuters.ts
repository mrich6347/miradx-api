import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { GetCommutersResponseDto } from '../dto/commuters.dto';

export function ApiGetCommuters() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Get all commuters in the system with optional filtering',
      description: 'Retrieve all commuters from the system. You can filter by commuter ID and/or name (partial search on first/last name). If no filters are provided, all commuters are returned.'
    }),
    ApiQuery({
      name: 'commuter_id',
      required: false,
      type: String,
      description: 'Filter by exact commuter ID (e.g., COM-123)'
    }),
    ApiQuery({
      name: 'name',
      required: false,
      type: String,
      description: 'Filter by name (partial match on first/last name, case-insensitive)'
    }),
    ApiResponse({ 
      status: 200,
      description: 'Successfully retrieved commuters',
      type: GetCommutersResponseDto
    })
  );
}
