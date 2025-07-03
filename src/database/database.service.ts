import { Injectable } from '@nestjs/common';
import { SupabaseService } from '../config/supabase.config';

@Injectable()
export class DatabaseService {
  constructor(private supabaseService: SupabaseService) {}

  // Regular client for general operations
  get client() {
    return this.supabaseService.client;
  }
}
