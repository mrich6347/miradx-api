import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CommutersService } from './commuters.service';
import {
  GetCommutersQueryDto,
  GetCommutersResponseDto
} from './dto/commuters.dto';
import { ApiGetCommuters } from './api-swagger-decorators/get-commuters';

@ApiTags('Commuters')
@Controller('commuters')
export class CommutersController {
  constructor(private commutersService: CommutersService) {}

  @Get()
  @ApiGetCommuters()
  async getCommuters(
    @Query() query: GetCommutersQueryDto
  ): Promise<GetCommutersResponseDto> {
    return await this.commutersService.getCommuters(query);
  }
}
