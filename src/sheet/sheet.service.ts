import { Injectable } from '@nestjs/common';
import { GoogleSheetConfig } from './config/google-api.config';

@Injectable()
export class SheetService {
  constructor(private googleInstance: GoogleSheetConfig) {}

  /**
   * get all rows in google sheet
   * remove the first row as it's the header
   * @return any as Array
   * @memberof SheetService
   */
  getSheetRows = async (): Promise<any> => {
    const spreadsheetId = '14Sqo-iZfWNlyTW89XpUvogFUKk7XEKCKefEAtK2AOuY';
    const { instance, auth } = await this.googleInstance.initialConfig();
    const readData: any = await instance.spreadsheets.values.get({
      auth: await auth, //auth object
      spreadsheetId, // spreadsheet id
      range: "'Feuille 1'!A1:R1000", //range of cells to read from.
    });

    return readData.shift();
  };
  private removeSheetRows = () => 'hello';
}
