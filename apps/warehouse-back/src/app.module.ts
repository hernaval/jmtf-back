import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { SyncModule } from './sync/sync.module';
import { RabbitMqService } from './rabbit-mq/rabbit-mq.service';
import { RabbitMqModule } from './rabbit-mq/rabbit-mq.module';

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
    UserModule,
    SyncModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
