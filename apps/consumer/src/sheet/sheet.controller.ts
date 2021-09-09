import { SYNC_SHEET } from '@app/shareds';
import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { SyncService } from 'apps/warehouse-back/src/sync/sync.service';

@Controller()
export class SheetController {
  constructor(private readonly syncService: SyncService) {}
  @MessagePattern(SYNC_SHEET)
  public async execute(@Payload() data: any, @Ctx() context: RmqContext) {
    Logger.log('consumer ready to perfom sync');
    const channel = context.getChannelRef();
    const orginalMessage = context.getMessage();
    Logger.debug(`data is ${JSON.stringify(data)}`);
    //await this.syncService.performSheetSync();
    channel.ack(orginalMessage);
  }
}
