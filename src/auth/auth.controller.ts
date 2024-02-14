import { Body, Controller, Get, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';

/*
  აღვწეროთ ინტერფეისი, რომელშიც განვსაზღვრავთ signUp მეთოდის სავარაუდო დაბრუნებად ტიპებს.
  ეს მეთოდი დააბრუნებს ან თოქენს ან დააფიქსირებს შეცდომას, ინტერფეისშიც მოვიქცეთ შესაბაისად :
*/
interface ApiResponse {
  token?: string;
  message?: string;
}

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signUp(@Body() signUpDto: SignUpDto): Promise<ApiResponse> {
    try {
      const result = await this.authService.signUp(signUpDto);
      return result; 
    } catch (error) {
      if (error.response && error.response.statusCode === 409) {
        return { message: error.response.message };
      } else {
        return { message: 'სერვერული ხარვეზი' };
      }
    }
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto): Promise<ApiResponse> {
    try {
      const result = await this.authService.login(loginDto);
      return result; 
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        return { message: error.message };
      } else {
        return { message: 'სერვერული ხარვეზი' };
      }
    }
  }
}
