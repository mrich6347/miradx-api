import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MicromortActionsService } from './micromort-actions.service';
import {
  GetMicromortActionsQueryDto,
  GetMicromortActionsResponseDto
} from './dto/micromort-actions.dto';
import { ApiGetMicromortActions } from './api-swagger-decorators/get-micromort-actions';

@ApiTags('Micromort Actions')
@Controller('micromort-actions')
export class MicromortActionsController {
  constructor(private micromortActionsService: MicromortActionsService) {}

  @Get()
  @ApiGetMicromortActions()
  async getMicromortActions(
    @Query() query: GetMicromortActionsQueryDto
  ): Promise<GetMicromortActionsResponseDto> {
    return await this.micromortActionsService.getMicromortActions(query);
  }
}
