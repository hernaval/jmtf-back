import { Body, Controller, Get, Logger } from '@nestjs/common';

@Controller('zapier')
export class ZapierController {

    @Get('test')
    async getData(@Body() data:any) {
        Logger.debug(data)

        return true;
    }
}
