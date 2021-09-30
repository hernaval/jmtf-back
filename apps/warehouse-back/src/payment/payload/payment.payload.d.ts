import { NextPayment } from '../schema/NextPayment.schema';
import { Payment } from '../schema/Payment.schema';

export type PaymentPayload = {
  payments: Payment[];
  nextPayments: NextPayment[];
};
