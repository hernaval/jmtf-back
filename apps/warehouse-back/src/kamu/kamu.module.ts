import { Module } from '@nestjs/common';
import { KamuService } from './kamu.service';

@Module({
  providers: [KamuService]
})
export class KamuModule {}
