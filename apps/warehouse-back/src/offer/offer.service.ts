import { ALLL_TICKET_URL, ALL_OFFER_URL } from '@app/shareds';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentService } from '../payment/payment.service';
import { Payment } from '../payment/schema/Payment.schema';
import { CreateOfferDto } from './schema/dto/CreateOfferDto';
import { SyncOfferDto } from './schema/dto/SyncOfferDto';
import { Offer, OfferDocument } from './schema/Offer.schema';

@Injectable()
export class OfferService {
  constructor(
    @InjectModel(Offer.name) private readonly offerModel: Model<OfferDocument>,
    private readonly httpService: HttpService,
    private readonly paymentService: PaymentService,
  ) {}

  findAll = async (): Promise<Offer[]> => {
    return await this.offerModel.find().exec();
  };

  findByRef = async (ref: string): Promise<Offer[]> => {
    return await this.offerModel.find({ ref }).exec();
  };

  createMany = async (createOfferDto: CreateOfferDto[]): Promise<Offer[]> => {
    return await this.offerModel.insertMany(createOfferDto);
  };

  findByItemIdInPayement = async (itemId: string): Promise<Payment[]> => {
    return await this.paymentService.findByItemId(itemId);
  };
  /**
   * retrieve all offer in MIPS DB
   * and retrieve also all ticket in MIPS DB
   * contact these data
   * @Return  Promise<SyncOfferDto[]>
   * @memberof OfferService
   */
  getAllOfferFromRemoteSource = async (): Promise<SyncOfferDto[]> => {
    const offerResponse: any = await this.httpService
      .get(`${ALL_OFFER_URL}`)
      .toPromise<any>();
    const ticketResponse: any = await this.httpService
      .get(`${ALLL_TICKET_URL}`)
      .toPromise<any>();

    return offerResponse.data.concat(ticketResponse.data);
  };

  /**
   * remote sources is not homegene
   * so we need to parse it to our dto
   * @return CreateOfferDto[]
   * @param {SyncOfferDto[]} sources
   * @memberof OfferService
   */
  parseRemoteSourceToPaymentDto = async (
    sources: SyncOfferDto[],
  ): Promise<CreateOfferDto[]> => {
    const dto: CreateOfferDto[] = [];

    await sources.forEach((item: SyncOfferDto) => {
      dto.push({
        ref: item.idOffer,
        name: item.nameOffer,
        image: item.imageOffer,
        priceTitle: item.titlePriceOffer,
        type: item.typeOffer ?? 'TICKET',
      });
    });

    return dto;
  };
}
