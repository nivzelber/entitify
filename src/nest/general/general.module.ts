import { Module } from '@nestjs/common';
import { GeneralService } from './general.service';
import { GeneralController } from './general.controller';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService]
})
export class GeneralModule {}
