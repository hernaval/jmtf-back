import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { SyncUserDto } from './dto/sync-user.dto';
import { User, UserDocument } from './schema/User.schema';
import { LoginUserDto } from './dto/login-user.dto';
import { MailService } from '../mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { ImcUserDto } from './dto/imc-user.dto';
import * as IMCTest from './constants/imc-constants';

@Injectable() 
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private mailService: MailService,
    private jwtService: JwtService
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
    let data = createUserDto;
    data.password = await this.generatePassword(12); 
    await this.mailService.sendNewPassword(data.email, data.password);
    return await new this.userModel({
      ...data,
      createdAt: new Date(),
    }).save();
  };

  testMail = async (email: string) => {
    return await this.mailService.testSendMail(email);
  };

  login = async (loginUserDto: LoginUserDto): Promise<any> => {
    const user = await this.userModel.findOne({ email: loginUserDto.email }).exec();
    if (!user) {
      return {
        error: true,
        message: 'Votre email n\'est pas un membre'
      }
    }
    if (user.password === null) {
      const newPassword = await this.generatePassword(12);
      user.password = newPassword;
      await user.save();
      await this.mailService.sendNewPassword(user.email, user.password);
      return {
        error: true,
        message: 'Votre mot de passe a été généré automatiquement. \
        Veuillez vérifier votre email pour vous authentifier'
      }
    }
    if (user.password !== loginUserDto.password) {
      return {
        error: true,
        message: 'Email ou mot de passe incorrect'
      } 
    }
    const payload =  {
        id: user._id,
        email: user.email,
        firstname : user.firstname,
        lastname: user.lastname 
    }
    const jwt = await this.jwtService.sign(payload);
    return {
      token: jwt,
      id: user._id,
      email: user.email,
      firstname : user.firstname,
      lastname: user.lastname 
    }
  };

  forgot = async (data): Promise<any> => {
    let user = await this.userModel.findOne({ email: data.email }).exec();
    if (!user) {
      return {
        error: true,
        message: 'Votre email n\'est pas un membre'
      }
  };
  
    const newPassword = await this.generatePassword(12); 
    user.password = newPassword;
    user.save();
    await this.mailService.sendNewPassword(data.email, newPassword);
    return {
      success: true,
      message: 'un email vous est envoyé'
    }
  };


  generatePassword = async (passwordLength): Promise<string> => {
    var numberChars = "0&123456789";
    var upperChars = "ABC&D@EFGHIJKLMN!%OPQR.S$TUVWXYZ";
    var lowerChars = "a@bcde@fghij:klm&no!!pqr!!stu$vw$xyz";
    var allChars = numberChars + upperChars + lowerChars; 
    var randPasswordArray = Array(passwordLength);
    randPasswordArray[0] = numberChars;
    randPasswordArray[1] = upperChars;
    randPasswordArray[2] = lowerChars;
    randPasswordArray = randPasswordArray.fill(allChars, 3);
    return this.shuffleArray(randPasswordArray.map(function(x) { return x[Math.floor(Math.random() * x.length)] })).join('');
  };
  
  shuffleArray = (array) => {
    for (var i = array.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
    return array;
  };

  // Immportant for the first time
  reinitAllUsersPassword = async () => {
    const users = await this.userModel.find().exec();
    users.forEach(async(user) => {
      const newPassword = await this.generatePassword(12);
      user.password = newPassword;
      user.save();
      await this.mailService.sendNewPassword(user.email, newPassword);
    })
  };

  getInformation = async (userId: string) => {
    const user = await this.userModel.findById(userId).exec();
    const {password, ...result} = user;
    return result;
  }

  updatePersonalInformation = async (userId: string, data: any) => {
    const user = await this.userModel.findByIdAndUpdate(userId, data).exec();
    if (!user) return {
      error: true,
      message: 'Client introuvable'
    }
    return {
      success: true
    }
  }

  updateImc = async (data: ImcUserDto[]):Promise<void> => {
    data.forEach( async (user: ImcUserDto) => {
        await this.userModel.find({ email: user.Email }).updateMany({isIMCParticipate: true})
    })
  }

  updateSuccessTests = async (data: ImcUserDto[], testname: string) => {
    Logger.log(testname)
    data.forEach( async (user: ImcUserDto) => {
      console.log(await this.userModel.findOne({email: user.Email}).exec())

      let tests = []
      
      switch (testname) {
        case IMCTest.LEADERSHIP:
          Logger.log('leadeship')
          tests.push(IMCTest.LEADERSHIP)
          break;
      
        default:
          break;
      }

      await this.userModel.findOne({ email: user.Email }).updateOne({successfulTests: tests})
    })
  }



  changePassword = async (userId: string, data: {oldPassword: string, newPassword: string}) => {
    const user = await this.userModel.findById(userId).exec();
    console.log(user);
    if (user.password !== data.oldPassword) {
      return {
        error: true,
        message: 'Mot de passe incorrect'
      }
    }
    user.password = data.newPassword;
    await user.save();
    return {
      success: true,
      message: 'Mot de passe modifié'
    }
  }

}
