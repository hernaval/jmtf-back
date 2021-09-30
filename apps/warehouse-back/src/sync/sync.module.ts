import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';
import { PaymentModule } from '../payment/payment.module';
import { UserModule } from '../user/user.module';
import { SheetModule } from '../sheet/sheet.module';
import { OfferModule } from '../offer/offer.module';

@Module({
  providers: [SyncService],
  controllers: [SyncController],
  imports: [
    RabbitMqModule,
    PaymentModule,
    UserModule,
    SheetModule,
    OfferModule,
  ],
  exports: [SyncService],
})
export class SyncModule {}
