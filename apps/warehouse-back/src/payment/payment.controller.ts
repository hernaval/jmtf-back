import { Controller, Get, Logger, Param, Query } from '@nestjs/common';
import { NextPaymentService } from './next-payment.service';
import { PaymentPayload } from './payload/payment.payload';
import { PaymentService } from './payment.service';
import { NextPayment } from './schema/NextPayment.schema';
import { Payment } from './schema/Payment.schema';

@Controller('payments')
export class PaymentController {
  constructor(
    private paymentService: PaymentService,
    private readonly nextPaymentService: NextPaymentService,
  ) {}

  @Get()
  async allPayments(): Promise<Payment[]> {
    return await this.paymentService.findAll();
  }

  @Get('/next')
  async allNextPayments(): Promise<NextPayment[]> {
    return await this.nextPaymentService.findAll();
  }

  @Get('user/:email')
  async allUserPayments(
    @Param('email') email: string,
  ): Promise<PaymentPayload> {
    const payments: Payment[] = await this.paymentService.findByEmail(email);
    const nextPayments: NextPayment[] =
      await this.nextPaymentService.findByEmail(email);
    Logger.log(`${JSON.stringify(payments)}`);
    return {
      payments,
      nextPayments,
    };
  }
}
