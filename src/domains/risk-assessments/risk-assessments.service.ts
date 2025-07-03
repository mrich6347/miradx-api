import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { CreateRiskAssessmentDto, RiskAssessmentResponseDto } from './dto/risk-assessments.dto';

@Injectable()
export class RiskAssessmentsService {
  constructor(private databaseService: DatabaseService) {}

  async createRiskAssessment(dto: CreateRiskAssessmentDto): Promise<RiskAssessmentResponseDto> {
    // Validate commuter exists
    await this.validateCommuter(dto.commuterId);
    
    // Validate all timestamps are from the same day
    this.validateSameDay(dto.actions);
    
    // Calculate risk
    const totalRisk = await this.calculateRisk(dto);
    
    // Store the assessment
    await this.storeAssessment(dto, totalRisk);
    
    return {
      commuterId: dto.commuterId,
      risk: Math.round(totalRisk * 100) / 100 // Round to 2 decimal places
    };
  }

  private async validateCommuter(commuterId: string): Promise<void> {
    const { data, error } = await this.databaseService.client
      .from('commuters')
      .select('commuter_id')
      .eq('commuter_id', commuterId)
      .single();

    if (error || !data) {
      throw new NotFoundException(`Commuter with ID ${commuterId} not found`);
    }
  }

  private validateSameDay(actions: any[]): void {
    if (actions.length === 0) {
      throw new BadRequestException('At least one action is required');
    }

    const dates = actions.map(action => {
      const date = new Date(action.timestamp);
      if (isNaN(date.getTime())) {
        throw new BadRequestException(`Invalid timestamp: ${action.timestamp}`);
      }
      return date.toDateString();
    });

    const uniqueDates = [...new Set(dates)];
    if (uniqueDates.length > 1) {
      throw new BadRequestException('All actions must be from the same day');
    }
  }

  private async calculateRisk(dto: CreateRiskAssessmentDto): Promise<number> {
    // Execute all micromort action lookups in parallel using Promise.all
    const micromortPromises = dto.actions.map(async (action) => {
      const { data, error } = await this.databaseService.client
        .from('micromort_actions')
        .select('micromorts_per_unit')
        .eq('action_name', action.action)
        .eq('unit', action.unit)
        .single();

      if (error || !data) {
        throw new NotFoundException(
          `Action '${action.action}' with unit '${action.unit}' not found in the system`
        );
      }
      

      return {
        action,
        micromortsPerUnit: data.micromorts_per_unit
      };
    });

    // Wait for all database queries to complete
    const micromortResults = await Promise.all(micromortPromises);

    // Calculate total risk
    let totalRisk = 0;
    for (const result of micromortResults) {
      const actionRisk = result.action.quantity * result.micromortsPerUnit;
      totalRisk += actionRisk;
    }

    return totalRisk;
  }

  private async storeAssessment(dto: CreateRiskAssessmentDto, totalRisk: number): Promise<void> {
    const { error } = await this.databaseService.client
      .from('risk_assessments')
      .insert({
        commuter_id: dto.commuterId,
        calculated_risk_micromorts: totalRisk,
        input_actions_json: dto.actions
      });

    if (error) {
      throw new Error(`Failed to store risk assessment: ${error.message}`);
    }
  }
}
