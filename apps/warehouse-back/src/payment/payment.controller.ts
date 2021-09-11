import { Controller, Get, Param } from '@nestjs/common';
import { PaymentService } from './payment.service';
import { Payment } from './schema/Payment.schema';

@Controller('payments')
export class PaymentController {
  constructor(private paymentService: PaymentService) {}

  @Get()
  async allPayments(): Promise<Payment[]> {
    return await this.paymentService.findAll();
  }

  @Get('user/:email')
  async allUserPayments(@Param('email') email: string): Promise<Payment[]> {
    return await this.paymentService.findByEmail(email);
  }
}
