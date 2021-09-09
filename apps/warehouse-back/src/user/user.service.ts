import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schema/User.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  findAll = async (): Promise<User[]> => {
    return await this.userModel.find().exec();
  };

  findOne = async (id: string): Promise<User> => {
    return await this.userModel.findById(id).exec();
  };

  createMany = async (createUserDto: CreateUserDto[]): Promise<User[]> => {
    return await this.userModel.insertMany(createUserDto);
  };

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    return await new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  };
}
