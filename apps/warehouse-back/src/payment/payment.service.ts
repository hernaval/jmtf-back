import { ALL_PAYMENT_URL } from '@app/shareds';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePayementDto } from './dto/create-payment.dto';
import { SyncPaymentDto } from './dto/sync-payment.dto';
import {
  Payment,
  PaymentDocument,
  PaymentTypeEnum,
} from './schema/Payment.schema';

@Injectable()
export class PaymentService {
  constructor(
    @InjectModel(Payment.name)
    private readonly paymentModel: Model<PaymentDocument>,
    private readonly httpService: HttpService,
  ) {}

  findAll = async (): Promise<Payment[]> => {
    return await this.paymentModel.find().exec();
  };

  findByEmail = async (email: string): Promise<Payment[]> => {
    return await this.paymentModel.find({ email }).exec();
  };

  createMany = async (
    createPaymentDto: CreatePayementDto[],
  ): Promise<Payment[]> => {
    return await this.paymentModel.insertMany(createPaymentDto);
  };
  /**
   * retrieve all transactions in MIPS DB
   * @Return  Promise<SyncPaymentDto[]>
   * @memberof PaymentService
   */
  getAllPaymentFromRemoteSource = async (): Promise<SyncPaymentDto[]> => {
    const { data }: any = await this.httpService
      .get(`${ALL_PAYMENT_URL}`)
      .toPromise<any>();

    return data;
  };

  /**
   * remote sources is not homegene
   * so we need to parse it to our dto
   * @return CreatePayementDto[]
   * @param {SyncPaymentDto[]} sources
   * @memberof PaymentService
   */
  parseRemoteSourceToPaymentDto = async (
    sources: SyncPaymentDto[],
  ): Promise<CreatePayementDto[]> => {
    const dto: CreatePayementDto[] = [];

    await sources.forEach((item: SyncPaymentDto) => {
      const email: string = item.emailUser
        ? item.emailUser.split('_')[0]
        : item.email;
      dto.push({
        type: item.typeOffer ? PaymentTypeEnum.OFFER : PaymentTypeEnum.TICKET,
        itemId: item.idOffer ?? item.ticket,
        owner: item.nameUser ?? item.name,
        email,
        date: item.dateTransac ?? item.dateT,
        amount:
          item.typeOffer === 'ONETIME' ? item.priceOffer : item.initialPayOffer,
        status: item.status ?? 'PAYE',
        currency: item.currencyOffer,
        name: item.nameOffer,
        nameImage: item.imageOffer,
      });
    });

    return dto;
  };
}
