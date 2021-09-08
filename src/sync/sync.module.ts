import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { SheetService } from 'src/sheet/sheet.service';
import { GoogleSheetConfig } from 'src/sheet/config/google-api.config';
import { UserService } from 'src/user/user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/user/schema/User.schema';

@Module({
  providers: [SyncService, SheetService, GoogleSheetConfig, UserService],
  controllers: [SyncController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
})
export class SyncModule {}
