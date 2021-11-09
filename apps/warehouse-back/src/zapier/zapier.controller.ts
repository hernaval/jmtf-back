import { Body, Controller, Get, Logger } from '@nestjs/common';

@Controller('zapier')
export class ZapierController {

    @Get('test')
    async getData(@Body() request:any) {
        Logger.debug('my data')
        Logger.debug(request)

        let { data } = request
        Logger.debug("all emails")
        Logger.debug(data.emails)

        Logger.debug("String email")
        Logger.debug(data.emails.split(",").join("|"))

        return "hernavalasco@gmail.com";
    }
}
