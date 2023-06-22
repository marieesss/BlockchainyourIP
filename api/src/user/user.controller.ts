import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import User from './user.entity';
import { UserService } from './user.service';
export class CreateUserDto {
    username: string;
    email: string;
    password: string;
  }

@Controller('users')
export class UserController {
  constructor(private readonly UserService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    const messages = await this.UserService.getAllUsers();
    return messages;
  }

  @Get(':id')
  async getAllUsersById(@Param('id') id: number): Promise<User> {
    const message = await this.UserService.getUserById(Number(id));
    return message;
  }

  @Post()
  async createUser(@Body() CreateUserDto: CreateUserDto) {
    const newUser = await this.UserService.createUser(CreateUserDto);
    return newUser;
  }

  @Post('connexion')
  async Connexion(@Body() CreateUserDto: CreateUserDto) {
    const connexion = await this.UserService.login(CreateUserDto.email, CreateUserDto.password);
    return connexion;
  }
}