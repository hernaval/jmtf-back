import { Body, Controller, Get, Post } from '@nestjs/common';
import { SyncService } from './sync.service';

@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Get('/user')
  async syncUser() {
    this.syncService.syncSheetWithBD();

    return 'sync sheet adding to queue';
  }

  @Post('/users')
  async syncUsers() {
    return await this.syncService.performSheetSync();
  }

  @Post('/payments')
  async syncPayments() {
    return await this.syncService.performPaymentSync();
  }

  @Post('/payments/next')
  async syncNextPayments() {
    return await this.syncService.performNextPaymentSync();
  }

  @Post('/offers')
  async syncOffers() {
    return await this.syncService.performOfferAsync();
  }

  @Post('/users/imc')
  async syncUserImc(
    @Body('filename') filename: string,
  ){
    return await this.syncService.performImcAsync(filename);
  }
}
