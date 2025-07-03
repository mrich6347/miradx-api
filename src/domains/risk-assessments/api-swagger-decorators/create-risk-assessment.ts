import { applyDecorators } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateRiskAssessmentDto, RiskAssessmentResponseDto } from '../dto/risk-assessments.dto';

export function ApiCreateRiskAssessment() {
  return applyDecorators(
    ApiOperation({ 
      summary: 'Calculate risk assessment for a commuter',
      description: 'Calculate the total risk in micromorts for a commuter based on their actions. All actions must be from the same day and the commuter must exist in the system.'
    }),
    ApiBody({
      type: CreateRiskAssessmentDto,
      description: 'Risk assessment request containing commuter ID and array of actions',
      examples: {
        example1: {
          summary: 'Sample risk assessment',
          value: {
            commuterId: 'COM-123',
            actions: [
              {
                timestamp: '2022-01-01 08:15:00',
                action: 'walked on sidewalk',
                unit: 'mile',
                quantity: 0.5
              },
              {
                timestamp: '2022-01-01 08:45:00',
                action: 'drove car',
                unit: 'minute',
                quantity: 30
              }
            ]
          }
        }
      }
    }),
    ApiResponse({
      status: 201,
      description: 'Risk assessment calculated successfully',
      type: RiskAssessmentResponseDto,
      examples: {
        example1: {
          summary: 'Successful risk calculation',
          value: {
            commuterId: 'COM-123',
            risk: 7.75
          }
        }
      }
    }),
    ApiResponse({ 
      status: 400,
      description: 'Bad request - validation failed (invalid commuter ID, actions not found, different days, etc.)'
    }),
    ApiResponse({ 
      status: 404,
      description: 'Commuter not found or one or more actions not found in the system'
    })
  );
}
