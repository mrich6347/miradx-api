import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RiskAssessmentsService } from './risk-assessments.service';
import {
  CreateRiskAssessmentDto,
  RiskAssessmentResponseDto
} from './dto/risk-assessments.dto';
import { ApiCreateRiskAssessment } from './api-swagger-decorators/create-risk-assessment';

@ApiTags('Risk Assessments')
@Controller('risk-assessments')
export class RiskAssessmentsController {
  constructor(private riskAssessmentsService: RiskAssessmentsService) {}

  @Post()
  @ApiCreateRiskAssessment()
  async createRiskAssessment(
    @Body() createRiskAssessmentDto: CreateRiskAssessmentDto
  ): Promise<RiskAssessmentResponseDto> {
    return await this.riskAssessmentsService.createRiskAssessment(createRiskAssessmentDto);
  }
}
