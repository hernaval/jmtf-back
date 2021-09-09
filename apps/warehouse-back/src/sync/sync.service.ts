import { SYNC_SHEET } from '@app/shareds';
import { Injectable, Logger } from '@nestjs/common';
import { RabbitMqService } from '../rabbit-mq/rabbit-mq.service';
import { SheetService } from '../sheet/sheet.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { User } from '../user/schema/User.schema';
@Injectable()
export class SyncService {
  constructor(
    private readonly rabbitMQService: RabbitMqService,
    private readonly sheetService: SheetService,
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
   * this is the background task
   * fetch rows and parse it
   * create users in mongodb
   * @returns Promise<User[]>
   */
  performSheetSync = async (): Promise<User[]> => {
    const sheetRows: any = await this.sheetService.getSheetRows();
    const createdUserDto: CreateUserDto[] =
      await this.sheetService.parseRowsToUserDto(sheetRows);

    return await this.sheetService.insertSheetRowsInDB(createdUserDto);
  };
}
