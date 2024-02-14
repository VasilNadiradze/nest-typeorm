// სტრატეგიაში ხდება აუტენტიფიკაციის ლოგიკის ინკაფსულაცია, აუტენტიფიკაციის სხვადასხვა მეთოდების აღწერა

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from 'src/user/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {
    super({
      /** 
       * ეს პარამეტრი განსაზღვრავს თუ როგორ უნდა ამოვიღოთ JWT შემომავალი მოთხოვნიდან.
       * ამ შემთხვევაში ამოვიღებთ Authorization header-დან როგორც bearer token.
      */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { id } = payload;

    const user = await this.usersRepository.findOne({
      where: {
        id: id,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Login first to access this endpoint.');
    }

    return user;
  }
}