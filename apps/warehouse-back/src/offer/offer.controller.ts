import { Controller, Get } from '@nestjs/common';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offerService: OfferService) {}

  @Get()
  async allOffer() {
    return await this.offerService.findAll();
  }
}
