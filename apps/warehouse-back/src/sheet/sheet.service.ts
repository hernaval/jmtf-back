import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { SyncUserDto } from '../user/dto/sync-user.dto';
import { User } from '../user/schema/User.schema';
import { UserService } from '../user/user.service';
import { GoogleSheetConfig } from './config/google-api.config';

@Injectable()
export class SheetService {
  private logger = new Logger(SheetService.name);
  constructor(
    private readonly googleInstance: GoogleSheetConfig,
    private readonly userService: UserService,
  ) {}

  /**
   * get all rows in google sheet
   * remove the first row as it's the header of sheet
   * @return any as Array
   * @memberof SheetService
   */
  getSheetRows = async (): Promise<any> => {
    const spreadsheetId = '14Sqo-iZfWNlyTW89XpUvogFUKk7XEKCKefEAtK2AOuY';
    const { instance, auth } = await this.googleInstance.initialConfig();
    const {
      data: { values },
    }: any = await instance.spreadsheets.values.get({
      auth: await auth, //auth object
      spreadsheetId, // spreadsheet id
      range: "'Feuille 1'!A1:R1000", //range of cells to read from.
    });

    values.shift();
    return values;
  };
  /**
   * sheet rows does not contains any key
   * so we need to match our dto attribute based on row index
   * @return SyncUserDto[]
   * @param {*} rows
   * @memberof SheetService
   */
  parseRowsToUserDto = async (rows: any): Promise<SyncUserDto[]> => {
    const dto: SyncUserDto[] = [];
    await rows.forEach((row) => {
      const createUserDto: SyncUserDto = {
        firstname: row[1],
        lastname: row[2],
        email: row[3],
        address: row[4],
        adressPlus: row[5],
        city: row[6],
        region: row[7],
        country: row[8],
        postalCode: row[9],
        invoiceOwner: row[10],
        invoiceAddress: row[11],
        invoiceAdressPlus: row[12],
        invoicePostalCode: row[13],
        invoiceCity: row[14],
        invoiceRegion: row[15],
        invoiceCountry: row[16],
        invoiceTVANumber: row[17],
        phone: row[18],
        birthDate: row[19],
        whatsapp: row[20],
      };
      dto.push(createUserDto);
    });

    return dto;
  };

  insertSheetRowsInDB = async (
    createUserDto: SyncUserDto[],
  ): Promise<User[]> => {
    return await this.userService.createMany(createUserDto);
  };

  removeSheetRows = () => 'hello';
}
