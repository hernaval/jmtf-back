import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/User.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userMode: Model<UserDocument>,
  ) {}
  create = async (createUserDto: CreateUserDto): Promise<User> => {
    return await new this.userMode({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  };
}
