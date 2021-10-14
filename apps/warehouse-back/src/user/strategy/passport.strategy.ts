import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PayloadUserDto } from '../dto/payload-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/User.schema';
import * as dotenv from 'dotenv';
dotenv.config(); 

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.SECRET,
    });
  }

  async validate(payload: PayloadUserDto) {
    const user = await this.userModel.findOne({email: payload.email}).exec();
    if (user) {
      // delete user.password;
      // delete user.salt;
      // return user;
      const {password, ...result} = user;
      return result;
    } else {
      throw new UnauthorizedException();
    }
  }
}