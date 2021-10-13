import { NestFactory } from '@nestjs/core';
import { ConsumerModule } from './consumer.module';
import { queueOptions } from '@app/shareds';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.createMicroservice(
    ConsumerModule,
    queueOptions.consumer,
  );
  await app.listen(() => Logger.log('consumer microservice is listening on'));
}
bootstrap();
