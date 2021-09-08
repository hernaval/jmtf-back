import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema({ collection: 'jmtf_member' })
export class User {
  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  birthDate: Date;

  @Prop({ required: true })
  phone: string;

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

  @Prop({ required: true })
  entryDate: string;

  @Prop({ required: true, default: false })
  isFbGroupMember: boolean;

  @Prop({ required: true })
  invoiceOwner: string;

  @Prop({ required: true })
  invoiceAddress: string;

  @Prop()
  invoiceAdressPlus?: string;

  @Prop({ required: true })
  invoicePostalCode: string;

  @Prop({ required: true })
  invoiceCity: string;

  @Prop({ required: true })
  invoiceRegion: string;

  @Prop({ required: true })
  invoiceCountry: string;

  @Prop({ required: true })
  invoiceTVANumber: string;

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
