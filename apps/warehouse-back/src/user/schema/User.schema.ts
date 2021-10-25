import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'jmtf_member' })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, default: null })
  password: string;

  @Prop()
  birthDate?: Date;

  @Prop()
  phone?: string;

  @Prop()
  whatsapp?: string;

  @Prop({ required: true })
  address: string;

  @Prop()
  adressPlus?: string;

  @Prop({ required: true })
  postalCode: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  region: string;

  @Prop({ required: true })
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
