import { PaymentTypeEnum } from '../schema/Payment.schema';

export class CreatePayementDto {
  type: PaymentTypeEnum;
  itemId: string;
  owner: string;
  email: string;
  status?: string;
  date: Date;
  name: string;
  amount: number;
  currency: string;
}
