import { Module, Global } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { SupabaseService } from '../config/supabase.config';

@Global()
@Module({
  providers: [SupabaseService, DatabaseService],
  exports: [DatabaseService, SupabaseService],
})
export class DatabaseModule {}
