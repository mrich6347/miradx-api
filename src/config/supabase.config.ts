import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable()
export class SupabaseService {
  private supabaseClient: SupabaseClient;
  private supabaseAdminClient: SupabaseClient;

  constructor(private configService: ConfigService) {
    const supabaseUrl = this.configService.get<string>('SUPABASE_URL');
    const supabaseAnonKey = this.configService.get<string>('SUPABASE_ANON_KEY');
    const supabaseServiceRoleKey = this.configService.get<string>('SUPABASE_SERVICE_ROLE_KEY');

    // Validate required environment variables
    if (!supabaseUrl) {
      throw new Error('SUPABASE_URL environment variable is required');
    }
    if (!supabaseAnonKey) {
      throw new Error('SUPABASE_ANON_KEY environment variable is required');
    }
    if (!supabaseServiceRoleKey) {
      throw new Error('SUPABASE_SERVICE_ROLE_KEY environment variable is required');
    }

    // Create clients
    this.supabaseClient = createClient(supabaseUrl, supabaseAnonKey);
    this.supabaseAdminClient = createClient(supabaseUrl, supabaseServiceRoleKey);
  }

  // Regular client for general operations
  get client(): SupabaseClient {
    return this.supabaseClient;
  }

  // Admin client for service operations
  get adminClient(): SupabaseClient {
    return this.supabaseAdminClient;
  }
}
