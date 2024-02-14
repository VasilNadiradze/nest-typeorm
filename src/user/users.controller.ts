import { Body, Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import User from './user.entity';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/user.dto';
import { AuthGuard } from '@nestjs/passport';

// სხვადასხვა ენდპოინტებში დასაბრუნებელი ინფორმაციების ტიპები
interface ApiResponse {
  user?: User; // დაბრუნდება ერთი მომხმარებელი
  users?: User[]; // დაბრუნდება  მომხმარებლების მასივი
  message?: string; // დაბრუნდება შეცდომის შეტყობინება 
}

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers(): Promise<ApiResponse> {
    try {
      const result = await this.usersService.getAllUsers();
      return { users: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const result = await this.usersService.getUserById(Number(id));
      return { user: result }; 
    } catch (error) {
      return { message: 'მომხმარებელი ვერ მოიძებნა' };
    }
  }

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<ApiResponse> {
    try {
      const result = await this.usersService.createUser(createUserDto);
      return { user: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }

  @Delete(':id')
  async deleteById(@Param('id') id: string): Promise<ApiResponse> {
    try {
      const result = await this.usersService.deleteById(Number(id));
      if (result === null) {
        return { message: 'მომხმარებელი ვერ მოიძებნა' };
      }
      return { user: result }; 
    } catch (error) {
      return { message: 'სერვერული ხარვეზი' };
    }
  }
}
