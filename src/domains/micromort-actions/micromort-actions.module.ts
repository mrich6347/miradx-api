import { Module } from '@nestjs/common';
import { MicromortActionsController } from './micromort-actions.controller';
import { MicromortActionsService } from './micromort-actions.service';

@Module({
  controllers: [MicromortActionsController],
  providers: [MicromortActionsService],
  exports: [MicromortActionsService]
})
export class MicromortActionsModule {}
