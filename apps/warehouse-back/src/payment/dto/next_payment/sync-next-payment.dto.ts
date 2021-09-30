export class SyncNextPaymentDto {
  email: string;
  offer: string;
  enterprise: string;
  amount: number;
  currency: string;
  firstPaymentDate: Date;
  nextPaymentDate?: Date;
}
