import {
  ClientProviderOptions,
  RmqOptions,
  Transport,
} from '@nestjs/microservices';

const producerQueue = 'rabbit-mq-module';
const consumerQueue = 'rabbit-mq-module';

const rmqOptions: RmqOptions = {
  transport: Transport.RMQ,
  options: {
    urls: [
      'amqps://iomazvdq:O3QXFLWZesKFs0pRYGE_vw9bxpme6WcY@beaver.rmq.cloudamqp.com/iomazvdq',
    ],
    queue: producerQueue,
  },
};

const producer: ClientProviderOptions = {
  ...rmqOptions,
  name: producerQueue,
  options: {
    ...rmqOptions.options,
    queue: producerQueue,
    // require explicit acknowledgement of messages
    noAck: false,
  },
};

const consumer: ClientProviderOptions = {
  ...rmqOptions,
  name: producerQueue,
  options: {
    ...rmqOptions.options,
    queue: consumerQueue,
    noAck: false,
    prefetchCount: 1,
  },
};

export const queueOptions = {
  producer,
  consumer,
};
