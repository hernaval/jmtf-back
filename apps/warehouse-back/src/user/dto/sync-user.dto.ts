export class SyncUserDto {
  kajabiId?:string;
  firstname: string;
  lastname?: string;
  email: string;
  birthDate?: Date;
  phone?: string;
  whatsapp?: string;
  address?: string;
  adressPlus?: string;
  postalCode: string;
  city?: string;
  region?: string;
  country?: string;
  entryDate?: Date;
  isFbGroupMember?: boolean;
  invoiceOwner?: string;
  invoiceAddress?: string;
  invoiceAdressPlus?: string;
  invoicePostalCode?: string;
  invoiceCity?: string;
  invoiceRegion?: string;
  invoiceCountry?: string;
  invoiceTVANumber?: string;
}
