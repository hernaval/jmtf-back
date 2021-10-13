import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SyncUserDto } from './dto/sync-user.dto';
import { User, UserDocument } from './schema/User.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private mailService: MailService
  ) {}

  findAll = async (): Promise<User[]> => {
    return await this.userModel.find().exec();
  };

  findOne = async (id: string): Promise<User> => {
    return await this.userModel.findById(id).exec();
  };

  findByEmail = async (email: string): Promise<User> => {
    return await this.userModel.findOne({ email }).exec();
  };

  createMany = async (
    createUserDto: CreateUserDto[] | SyncUserDto[],
  ): Promise<User[]> => {
    return await this.userModel.insertMany(createUserDto);
  };

  create = async (createUserDto: CreateUserDto): Promise<User> => {
    return await new this.userModel({
      ...createUserDto,
      createdAt: new Date(),
    }).save();
  };

  testMail = async (email: string) => {
    return await this.mailService.testSendMail(email);
  }

  login = async (loginUserDto: LoginUserDto): Promise<any> => {
    const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
    if (!user) {
      return {
        error: true,
        message: 'Votre email n\'est pas un membre'
      } 
    }
    console.log(user)
  };

  forgot = async (data): Promise<any> => {
    const user = await this.userModel.findOne({ email: data.email }).exec();
    if (!user) {
      return {
        error: true,
        message: 'Votre email n\'est pas un membre'
      }
    }

    const newPassword = await this.generatePassword(12);
    return {
      password: newPassword
    }
  }

  generatePassword = async (passwordLength): Promise<string> => {
    var numberChars = "0123456789";
    var upperChars = "ABCD@EFGHIJK/LMN!%OPQR.STUVWXYZ";
    var lowerChars = "a@bcde@fghij:klmno!!pqr!!stuvwxyz";
    var allChars = numberChars + upperChars + lowerChars; 
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  }
  
  shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  }

  reinitAllUsersPassword = async () => {
    const users = await this.userModel.find().exec();
    users.forEach(async(user) => {
      const newPassword = await this.generatePassword(12);
      const newData = {
        password: newPassword
      }
      await this.userModel.findOneAndUpdate({email: user.email}, newData, {upsert: true}, 
        function(err, doc) {})
    })
  }

}
