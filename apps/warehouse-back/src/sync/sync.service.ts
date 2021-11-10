import { SYNC_SHEET } from '@app/shareds';
import { Injectable, Logger, ValueProvider } from '@nestjs/common';
import { CsvService } from '../csv/csv.service';
import { OfferService } from '../offer/offer.service';
import { CreateOfferDto } from '../offer/schema/dto/CreateOfferDto';
import { SyncOfferDto } from '../offer/schema/dto/SyncOfferDto';
import { Offer } from '../offer/schema/Offer.schema';
import { CreatePayementDto } from '../payment/dto/create-payment.dto';
import { SyncNextPaymentDto } from '../payment/dto/next_payment/sync-next-payment.dto';
import { SyncPaymentDto } from '../payment/dto/sync-payment.dto';
import { NextPaymentService } from '../payment/next-payment.service';
import { PaymentService } from '../payment/payment.service';
import { NextPayment } from '../payment/schema/NextPayment.schema';
import { Payment } from '../payment/schema/Payment.schema';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { SheetService } from '../sheet/sheet.service';
import { ImcUserDto } from '../user/dto/imc-user.dto';
import { SyncUserDto } from '../user/dto/sync-user.dto';
import { User } from '../user/schema/User.schema';
import { UserService } from '../user/user.service';
import * as _ from 'lodash';
import * as imcResult from '../user/constants/imc-constants';

@Injectable()
export class SyncService {
  constructor(
    private readonly rabbitMQService: RabbitMqService,
    private readonly sheetService: SheetService,
    private readonly paymentService: PaymentService,
    private readonly nextPaymentService: NextPaymentService,
    private readonly offerService: OfferService,
    private readonly userService: UserService,
    private readonly csvService: CsvService,
  ) {}
  /**
   * sending message as event to queue to ask sheet sync
   * @memberof SyncService
   */
  syncSheetWithBD = (): void => {
    Logger.log('sending sheet sync event');
    this.rabbitMQService.send(SYNC_SHEET, {
      message: 'get all rows in sheet and insert it in database',
    });
  };

  /**
   * this is a background task
   * fetch rows and parse it
   * create users in mongodb
   * @returns Promise<User[]>
   */
  performSheetSync = async (): Promise<User[]> => {
    const sheetRows: any = await this.sheetService.getSheetRows();
    const createdUserDto: SyncUserDto[] =
      await this.sheetService.parseRowsToUserDto(sheetRows);

    return await this.sheetService.insertSheetRowsInDB(createdUserDto);
  };
/**
 * this is normally a background task
 * get data from csv file
 * csv file is normalized to follow SyncUserDto
 * @param {*} filename
 * @memberof SyncService
 */
performCsvSync = async (filename):Promise<User[]> => {
    const createdUserDto: SyncUserDto[] = await this.csvService.extractDataFromFile(filename) as SyncUserDto[]
    // Logger.debug(createdUserDto)

    return await this.userService.createMany(createdUserDto);
  }

  /**
   * this is a background task
   * fetch payment from remote source
   * parse it to payment dto
   * create payment in mongodb
   * @return Payment[]
   * @memberof SyncService
   */
  performPaymentSync = async (): Promise<Payment[]> => {
    const paymentSources: SyncPaymentDto[] =
      await this.paymentService.getAllPaymentFromRemoteSource();
    const createdPaymentDto: CreatePayementDto[] =
      await this.paymentService.parseRemoteSourceToPaymentDto(paymentSources);

    return await this.paymentService.createMany(createdPaymentDto);
  };

  performNextPaymentSync = async (): Promise<NextPayment[]> => {
    const nextPaymentSources: SyncNextPaymentDto[] =
      await this.nextPaymentService.getAllNextPaymentFromRemoteSource();
    const cleanData =
      await this.nextPaymentService.removeAllWithoutNextPaymentDate(
        nextPaymentSources,
      );
    return await this.nextPaymentService.createMany(cleanData);
  };

  performOfferAsync = async (): Promise<Offer[]> => {
    const offerSource: SyncOfferDto[] =
      await this.offerService.getAllOfferFromRemoteSource();
    const createOfferDto: CreateOfferDto[] =
      await this.offerService.parseRemoteSourceToPaymentDto(offerSource);

    return await this.offerService.createMany(createOfferDto);
  };

/**
 * this is normally a background task
 * get data from csv file
 * update related user in db
 * @param {string} filename
 * @memberof SyncService
 */
performImcAsync = async (filename: string):Promise<void> => {
    const imcData: ImcUserDto[] = await this.csvService.extractDataFromFile(filename) as ImcUserDto[]

    return await this.userService.updateImc(imcData);
  } 

  performImcTestSync = async (filename: string, testname: string):Promise<void> => {
    const imcData: ImcUserDto[] = await this.csvService.extractDataFromFile(filename) as ImcUserDto[]
    const imcSuccessData: ImcUserDto[] = imcData.filter(imc => imc.Passed === imcResult.TEST_PASSED)

    return await this.userService.updateSuccessTests(imcSuccessData, testname)
  }
}
