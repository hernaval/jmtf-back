import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Controller('zapier')
export class ZapierController {
    constructor(private readonly userService: UserService) {}

    @Post('test')
    async getData(@Body() request:any): Promise<string> {
       
        const { data: {kajabiId} } = request
        Logger.debug("contactId")
        Logger.debug(kajabiId)
        const {email} = await this.userService.findByKajabiId(kajabiId);


        return email;
    }
}
