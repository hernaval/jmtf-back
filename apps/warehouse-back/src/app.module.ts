import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SyncModule } from './sync/sync.module';
import { PaymentModule } from './payment/payment.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { OfferModule } from './offer/offer.module';
import { MailModule } from './mail/mail.module';
import { KamuModule } from './kamu/kamu.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
      inject: [ConfigService],
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
    }), 
    UserModule,
    SyncModule,
    PaymentModule,
    OfferModule,
    MailModule,
    KamuModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
