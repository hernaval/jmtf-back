import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { GoogleSheetConfig } from './config/google-api.config';
import { SheetService } from './sheet.service';

@Module({
  imports: [UserModule],
  providers: [SheetService, GoogleSheetConfig],
  exports: [SheetService, GoogleSheetConfig],
})
export class SheetModule {}
