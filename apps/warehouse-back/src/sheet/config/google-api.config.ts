import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';

@Injectable()
export class GoogleSheetConfig {
  initialConfig = async () => {
    const auth = new google.auth.GoogleAuth({
      keyFile: './jmtf-key.json', //the key file
      //url to spreadsheets API
      scopes: 'https://www.googleapis.com/auth/spreadsheets',
    });

    const authClientObject = await auth.getClient();

    const googleSheetsInstance = google.sheets({
      version: 'v4',
      auth: authClientObject,
    });

    return {
      instance: googleSheetsInstance,
      auth,
    };
  };
}
