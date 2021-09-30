import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NextPaymentService } from './next-payment.service';
import { PaymentController } from './payment.controller';
import { PaymentService } from './payment.service';
import { NextPayment, NextPaymentSchema } from './schema/NextPayment.schema';
import { Payment, PaymentSchema } from './schema/Payment.schema';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      {
        name: Payment.name,
        schema: PaymentSchema,
      },
      {
        name: NextPayment.name,
        schema: NextPaymentSchema,
      },
    ]),
  ],
  controllers: [PaymentController],
  providers: [PaymentService, NextPaymentService],
  exports: [PaymentService, NextPaymentService],
})
export class PaymentModule {}
