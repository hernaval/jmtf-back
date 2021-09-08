import { Controller } from '@nestjs/common';
import { SheetService } from 'src/sheet/sheet.service';
import { UserService } from 'src/user/user.service';

@Controller('sync')
export class SyncController {
  constructor(
    private readonly sheetService: SheetService,
    private readonly userService: UserService,
  ) {}
  /**
   * Loop rows from sheet
   * extract data and parse to create User Document
   * send it to queue
   *
   * @return {*}  {Promise<boolean>}
   */
  syncUser = async (): Promise<boolean> => {
    const sheetRows = await this.sheetService.getSheetRows();

    return true;
  };
}
