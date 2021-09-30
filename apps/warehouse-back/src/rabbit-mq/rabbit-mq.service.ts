import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class RabbitMqService {
  constructor(
    @Inject('rabbit-mq-module') private readonly client: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect();
  }

  /**
   * producer
   * global function to send message to queue
   * @param {string} pattern
   * @param {*} data
   * @memberof RabbitMqService
   */
  public send(pattern: string, data: any) {
    return this.client.send(pattern, data).toPromise();
  }
}
