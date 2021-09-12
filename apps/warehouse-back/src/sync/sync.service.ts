import { SYNC_SHEET } from '@app/shareds';
import { Injectable, Logger } from '@nestjs/common';
import { CreatePayementDto } from '../payment/dto/create-payment.dto';
import { SyncNextPaymentDto } from '../payment/dto/next_payment/sync-next-payment.dto';
import { SyncPaymentDto } from '../payment/dto/sync-payment.dto';
import { NextPaymentService } from '../payment/next-payment.service';
import { PaymentService } from '../payment/payment.service';
import { NextPayment } from '../payment/schema/NextPayment.schema';
import { Payment } from '../payment/schema/Payment.schema';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { SheetService } from '../sheet/sheet.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SyncUserDto } from '../user/dto/sync-user.dto';
import { User } from '../user/schema/User.schema';
@Injectable()
export class SyncService {
  constructor(
    private readonly rabbitMQService: RabbitMqService,
    private readonly sheetService: SheetService,
    private readonly paymentService: PaymentService,
    private readonly nextPaymentService: NextPaymentService,
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
}
