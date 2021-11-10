import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { ZapierController } from './zapier.controller';
import { ZapierService } from './zapier.service';

@Module({
  imports: [UserModule],
  controllers: [ZapierController],
  providers: [ZapierService]
})
export class ZapierModule {}
