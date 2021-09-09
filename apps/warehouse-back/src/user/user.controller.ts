import { Body, Controller, Get, Logger, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/User.schema';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async allUser(): Promise<User[]> {
    return await this.userService.findAll();
  }
  @Get(':id')
  async oneUser(@Param('id') id: string): Promise<User> {
    return await this.userService.findOne(id);
  }
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<User> {
    Logger.debug(`user request: ${JSON.stringify(createUserDto)}`);
    return await this.userService.create(createUserDto);
  }
}
