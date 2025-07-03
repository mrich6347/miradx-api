import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetMicromortActionsQueryDto, MicromortActionResponseDto } from './dto/micromort-actions.dto';

@Injectable()
export class MicromortActionsService {
  constructor(private databaseService: DatabaseService) {}

  async getMicromortActions(query: GetMicromortActionsQueryDto): Promise<{ data: MicromortActionResponseDto[]; count: number }> {
    let supabaseQuery = this.databaseService.client
      .from('micromort_actions')
      .select('*');

    // Apply unit filter if provided
    if (query.unit) {
      supabaseQuery = supabaseQuery.eq('unit', query.unit);
    }

    // Apply action name filter if provided (case-insensitive partial match)
    if (query.action_name) {
      supabaseQuery = supabaseQuery.ilike('action_name', `%${query.action_name}%`);
    }

    // Order by action name for consistent results
    supabaseQuery = supabaseQuery.order('action_name', { ascending: true });

    const { data, error } = await supabaseQuery;

    if (error) {
      throw new Error(`Failed to fetch micromort actions: ${error.message}`);
    }

    return {
      data: data || [],
      count: data?.length || 0
    };
  }
}
