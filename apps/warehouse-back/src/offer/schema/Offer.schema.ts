import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'jmtf_offer' })
export class Offer {
  @Prop({ required: true, unique: true })
  ref: string; // the id of the offer

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  image: string;

  @Prop()
  priceTitle?: string; //minimal desciption of pricing used in checkout
}
export type OfferDocument = Offer & Document;
export const OfferSchema = SchemaFactory.createForClass(Offer);
