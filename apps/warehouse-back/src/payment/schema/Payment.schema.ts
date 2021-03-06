import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export enum PaymentTypeEnum {
  TICKET,
  OFFER,
}

@Schema({ collection: 'jmtf_payment' })
export class Payment {
  @Prop({ required: true, enum: PaymentTypeEnum })
  type: string;

  @Prop({ required: true })
  itemId: string; // the id of the offer or the ticket

  @Prop({ required: true })
  owner: string;

  @Prop({ required: true })
  email: string;

  @Prop()
  status?: string;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  name: string; // the name of the offer

  @Prop({ required: true })
  nameImage: string; // the image name of the offer

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;
}
export const PaymentSchema = SchemaFactory.createForClass(Payment);
export type PaymentDocument = Payment & Document;
