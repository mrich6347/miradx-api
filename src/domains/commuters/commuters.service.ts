import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { GetCommutersQueryDto, CommuterResponseDto } from './dto/commuters.dto';

@Injectable()
export class CommutersService {
  constructor(private databaseService: DatabaseService) {}

  async getCommuters(query: GetCommutersQueryDto): Promise<{ data: CommuterResponseDto[]; count: number }> {
    let supabaseQuery = this.databaseService.client
      .from('commuters')
      .select('*');

    // Apply commuter_id filter if provided (exact match)
    if (query.commuter_id) {
      supabaseQuery = supabaseQuery.eq('commuter_id', query.commuter_id);
    }

    // Apply name filter if provided (case-insensitive partial match)
    if (query.name) {
      supabaseQuery = supabaseQuery.ilike('name', `%${query.name}%`);
    }

    // Order by name for consistent results
    supabaseQuery = supabaseQuery.order('name', { ascending: true });

    const { data, error } = await supabaseQuery;

    if (error) {
      throw new Error(`Failed to fetch commuters: ${error.message}`);
    }

    return {
      data: data || [],
      count: data?.length || 0
    };
  }
}
