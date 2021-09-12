import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'jmtf_next_payment' })
export class NextPayment {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  offer: string;

  @Prop({ required: true })
  enterprise: string;

  @Prop({ required: true })
  amount: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  firstPaymentDate: Date;

  @Prop()
  nextPaymentDate?: Date;
}
export type NextPaymentDocument = Document & NextPayment;
export const NextPaymentSchema = SchemaFactory.createForClass(NextPayment);
