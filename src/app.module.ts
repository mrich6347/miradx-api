import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { MicromortActionsModule } from './domains/micromort-actions/micromort-actions.module';
import { HealthCheckModule } from './domains/health-check/health-check.module';
import { CommutersModule } from './domains/commuters/commuters.module';
import { RiskAssessmentsModule } from './domains/risk-assessments/risk-assessments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    DatabaseModule,
    MicromortActionsModule,
    HealthCheckModule,
    CommutersModule,
    RiskAssessmentsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
