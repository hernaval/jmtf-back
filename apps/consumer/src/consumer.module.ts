import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { SyncModule } from 'apps/warehouse-back/src/sync/sync.module';
import { ConsumerController } from './consumer.controller';
import { ConsumerService } from './consumer.service';
import { SheetController } from './sheet/sheet.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SyncModule,
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [ConsumerController, SheetController],
  providers: [ConsumerService],
})
export class ConsumerModule {}
