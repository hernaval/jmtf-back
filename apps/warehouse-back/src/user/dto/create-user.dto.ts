export class CreateUserDto {
  firstname: string;
  lastname: string;
  email: string;
  birthDate?: Date;
  phone?: string;
  whatsapp?: string;
  address: string;
  adressPlus?: string;
  postalCode: string;
  city: string;
  region: string;
  country: string;
  entryDate?: Date;
  isFbGroupMember: boolean;
  password?: string;
}
