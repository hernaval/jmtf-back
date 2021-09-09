import { Controller, Get } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('/user')
  async syncUser() {
    this.syncService.syncSheetWithBD();

    return 'sync sheet adding to queue';
  }
}
