import { Controller, Get, Param } from '@nestjs/common';
import { Payment } from '../payment/schema/Payment.schema';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  async allOffer() {
    return await this.offerService.findAll();
  }

  @Get(':itemId/users')
  async allUserOffer(@Param('itemId') itemId: string): Promise<Payment[]> {
    return await this.offerService.findByItemIdInPayement(itemId);
  }
}
