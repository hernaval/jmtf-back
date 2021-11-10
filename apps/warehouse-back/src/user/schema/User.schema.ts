import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'jmtf_member' })
export class User {

  @Prop({ unique: true })
  kajabiId: string;

  @Prop({ required: true })
  firstname: string;

  @Prop()
  lastname?: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  password?: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  phone?: string;

  @Prop()
  whatsapp?: string;

  @Prop()
  address?: string;

  @Prop()
  adressPlus?: string;

  @Prop()
  postalCode?: string;

  @Prop()
  city: string;

  @Prop()
  region: string;

  @Prop()
  country: string;

  @Prop()
  entryDate?: string;

  @Prop({ required: true, default: false })
  isFbGroupMember: boolean;

  @Prop()
  invoiceOwner?: string;

  @Prop()
  invoiceAddress?: string;

  @Prop()
  invoiceAdressPlus?: string;

  @Prop()
  invoicePostalCode?: string;

  @Prop()
  invoiceCity?: string;

  @Prop()
  invoiceRegion?: string;

  @Prop()
  invoiceCountry?: string;

  @Prop()
  invoiceTVANumber?: string;

  @Prop()
  devis?: string;

  @Prop()
  paidAmount?: number;

  @Prop()
  isCertified?: boolean;

  @Prop()
  isCertificateSend?: boolean;

  @Prop()
  certificateNumber?: string;

  @Prop()
  successfulTests?: string[];

  @Prop()
  isIMCParticipate?: boolean;

  @Prop()
  firstIMCDate?: Date;

  @Prop()
  lastIMCDate?: Date;

  @Prop()
  note?: string;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;
