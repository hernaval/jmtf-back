import { Module } from '@nestjs/common';
import { SyncService } from './sync.service';
import { SyncController } from './sync.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { SheetService } from '../sheet/sheet.service';
import { GoogleSheetConfig } from '../sheet/config/google-api.config';
import { UserService } from '../user/user.service';
import { User, UserSchema } from '../user/schema/User.schema';
import { RabbitMqModule } from '../rabbit-mq/rabbit-mq.module';
import { PaymentModule } from '../payment/payment.module';
import { UserModule } from '../user/user.module';

@Module({
  providers: [SyncService, SheetService, GoogleSheetConfig],
  controllers: [SyncController],
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    RabbitMqModule,
    PaymentModule,
    UserModule,
  ],
  exports: [SyncService],
})
export class SyncModule {}
