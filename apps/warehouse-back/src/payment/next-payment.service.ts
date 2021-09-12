import { ALL_NEXT_PAYMENT_URL } from '@app/shareds';
import { HttpService, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SyncNextPaymentDto } from './dto/next_payment/sync-next-payment.dto';
import { NextPayment, NextPaymentDocument } from './schema/NextPayment.schema';

@Injectable()
export class NextPaymentService {
  constructor(
    @InjectModel(NextPayment.name)
    private readonly paymentModel: Model<NextPaymentDocument>,
    private readonly httpService: HttpService,
  ) {}
  findAll = async (): Promise<NextPayment[]> => {
    return await this.paymentModel.find().exec();
  };

  findByEmail = async (email: string): Promise<NextPayment[]> => {
    return await this.paymentModel.find({ email }).exec();
  };

  createMany = async (
    createPaymentDto: SyncNextPaymentDto[],
  ): Promise<NextPayment[]> => {
    return await this.paymentModel.insertMany(createPaymentDto);
  };
  /**
   * retrieve all next required payment in MIPS API
   * @Return  Promise<SyncPaymentDto[]>
   * @memberof NextPaymentService
   */
  getAllNextPaymentFromRemoteSource = async (): Promise<
    SyncNextPaymentDto[]
  > => {
    const { data }: any = await this.httpService
      .get(`${ALL_NEXT_PAYMENT_URL}`)
      .toPromise<any>();

    return data;
  };
  /**
   * remove element without nextPaymentDate
   * they are unecesary
   * @param {SyncNextPaymentDto[]} data
   * @memberof NextPaymentService
   */
  removeAllWithoutNextPaymentDate = async (
    data: SyncNextPaymentDto[],
  ): Promise<SyncNextPaymentDto[]> => {
    return await data.filter((d) => d.nextPaymentDate != null);
  };
}
