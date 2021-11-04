import { Body, Controller, Get, Logger, Param, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schema/User.schema';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UserDecorator } from './decorators/user.decorator';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async allUser(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify_token')   
  async verifyToken(
    @UserDecorator() user
  ) { 
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('informations')   
  async getInformation(
    @UserDecorator() user
  ) { 
    const userId = user._doc._id.toString();
    return await this.userService.getInformation(userId);
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

  @Post('login')
  async loginUser(@Body() loginUser: LoginUserDto): Promise<any> {
    Logger.debug(`login user ${loginUser.email}`);
    return await this.userService.login(loginUser);
  }
  
  @Post('mail')
  async testMail(
    @Body() data: {email: string}
  ) {
    return await this.userService.testMail(data.email);
  }

  @Post('forgot')
  async forgot(
    @Body() data: {email: string}
  ) {
    return await this.userService.forgot(data);
  }

  @UseGuards(JwtAuthGuard)
  @Post('updatePersonalInformation')
  async updatePersonalInformation(
    @UserDecorator() user,
    @Body() data: any
  ) {
    const userId = user._doc._id.toString();
    return await this.userService.updatePersonalInformation(userId, data);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('changePassword')
  async changePassword(
    @UserDecorator() user,
    @Body() data: {oldPassword: string, newPassword: string}
  ) {
    const userId = user._doc._id.toString();
    return await this.userService.changePassword(userId, data);
  }

}
