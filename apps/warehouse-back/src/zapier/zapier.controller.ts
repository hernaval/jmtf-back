import { Body, Controller, Get, Logger, Post, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('zapier')
export class ZapierController {
    constructor(private readonly userService: UserService) {}

    @Get('test')
    async getData(
        @Query('kajabiId') kajabiId: string 
    ): Promise<string> {
        Logger.debug("request")
        Logger.debug(kajabiId)
        const {email} = await this.userService.findByKajabiId(kajabiId);


        return email;
    }
}
