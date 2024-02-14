import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import User from 'src/user/user.entity';

@Injectable()
export class AuthService {
  
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<{ token: string }> {
    try {
      const { name, email, password } = signUpDto;

      // გადავამოწმოთ დაკავებულია თU არა ელ-ფოსტა
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: email,
        },
      });

      if (existingUser) {
        throw new ConflictException('ელ-ფოსტა დაკავებულია');
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = this.usersRepository.create({
        name,
        email,
        password: hashedPassword,
      });

      // შევინახოთ მომხმარებელი
      await this.usersRepository.save(newUser);

      // დავაგენერიროთ JWT token
      const token = this.jwtService.sign({ id: newUser.id });

      return { token };
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error; 
      } else {
        throw new Error('სერვერული ხარვეზი');
      }
    }
  }

  async login(loginDto: LoginDto): Promise<{ token?: string; success?: boolean; message?: string }> {
    try {
      const { email, password } = loginDto;
  
      const user = await this.usersRepository.findOne({
        where: { email },
      });
  
      if (!user) {
        throw new UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
      }
  
      const isPasswordMatched = await bcrypt.compare(password, user.password);
  
      if (!isPasswordMatched) {
        throw new UnauthorizedException('არასწორი ელ-ფოსტა ან პაროლი');
      }
  
      const token = this.jwtService.sign({ id: user.id });
  
      return { success: true, token };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { success: false, message: 'არასწორი ელ-ფოსტა ან პაროლი' };
      } else {
        return { success: false, message: 'სერვერული ხარვეზი' };
      }
    }
  }  
}
