import { Module } from '@nestjs/common';
import { CommutersController } from './commuters.controller';
import { CommutersService } from './commuters.service';

@Module({
  controllers: [CommutersController],
  providers: [CommutersService],
  exports: [CommutersService]
})
export class CommutersModule {}
