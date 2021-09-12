export class SyncPaymentDto {
  id: string;
  idOffer?: string;
  ticket?: string;
  name?: string;
  nameUser?: string;
  email?: string;
  emailUser?: string;
  status?: string;
  dateTransac: Date;
  dateT: Date;
  typeOffer?: string;
  nameOffer: string;
  initialPayOffer?: number;
  priceOffer?: number;
  currencyOffer: string;
}
