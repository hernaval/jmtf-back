import { queueOptions } from '@app/shareds';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { RabbitMqService } from './rabbit-mq.service';

@Module({
  imports: [ClientsModule.register([queueOptions.producer])],
  providers: [RabbitMqService],
  exports: [RabbitMqService],
  controllers: [],
})
export class RabbitMqModule {}
