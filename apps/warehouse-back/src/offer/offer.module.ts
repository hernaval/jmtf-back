import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OfferService } from './offer.service';
import { Offer, OfferSchema } from './schema/Offer.schema';
import { OfferController } from './offer.controller';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Offer.name,
        schema: OfferSchema,
      },
    ]),
  ],
  providers: [OfferService],
  exports: [OfferService],
  controllers: [OfferController],
})
export class OfferModule {}
