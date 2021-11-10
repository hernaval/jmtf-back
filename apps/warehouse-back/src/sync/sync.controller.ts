import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
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
  async syncUsers(
    @Body() data
  ) {
    if(data.query && data.query === 'external') {
      
      return await this.syncService.performCsvSync('users.csv');
    } 
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

  @Post('/users/imc/test')
  async syncUserImcTest(
    @Body('filename') filename: string,
    @Body('testname') testname: string,
  ){
    return await this.syncService.performImcTestSync(filename, testname);
  }
}
