import { Module } from '@nestjs/common';
import { SharedsService } from './shareds.service';

@Module({
  providers: [SharedsService],
  exports: [SharedsService],
})
export class SharedsModule {}
