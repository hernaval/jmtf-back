import { Module } from '@nestjs/common';
import { GoogleSheetConfig } from './config/google-api.config';
import { SheetService } from './sheet.service';

@Module({
  providers: [SheetService, GoogleSheetConfig],
})
export class SheetModule {}
