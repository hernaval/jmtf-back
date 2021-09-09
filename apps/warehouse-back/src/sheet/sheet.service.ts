import { Injectable, Logger } from '@nestjs/common';
import { CreateUserDto } from '../user/dto/create-user.dto';
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

  parseRowsToUserDto = async (rows: any): Promise<CreateUserDto[]> => {
    const dto: CreateUserDto[] = [];
    await rows.forEach((row) => {
      const createUserDto: CreateUserDto = {
        firstname: row[1],
        lastname: row[2],
        email: row[3],
        birthDate: new Date(),
        phone: '33xxxxxxxxxx',
        address: row[4],
        adressPlus: row[5],
        city: row[6],
        region: row[7],
        country: row[8],
        postalCode: row[9],
      };
      dto.push(createUserDto);
    });

    return dto;
  };

  insertSheetRowsInDB = async (
    createUserDto: CreateUserDto[],
  ): Promise<User[]> => {
    return await this.userService.createMany(createUserDto);
  };

  removeSheetRows = () => 'hello';
}
