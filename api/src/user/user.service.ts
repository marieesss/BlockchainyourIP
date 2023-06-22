import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './user.controller';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  saltOrRounds = 10;

  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async getAllUsers() {
    const users = this.UserRepository.find();
    return users;
  }

  async getUserById(id: number) {
    const user = await this.UserRepository.findOne({
      where: {
        id: id,
      },
    });
    if (user) {
      return user;
    }
    throw new NotFoundException('Could not find the user');
  }

  async createUser(CreateUserDto: CreateUserDto) {
    console.log(CreateUserDto.password)
    const hashPassword = await bcrypt.hash(CreateUserDto.password, this.saltOrRounds);
    const data = {
      email: CreateUserDto.email,
      username: CreateUserDto.username,
      password: hashPassword
    };
    const newUser = await this.UserRepository.create(data);
    await this.UserRepository.save(newUser);
    return newUser;
  }
  
  
  async login(email: string, pass: string) {
    const user = await this.UserRepository.findOne({ where: { email } });
  
    if (!user) {
      throw new NotFoundException('Could not find the email');
    }
  
    const isMatch = await bcrypt.compare(pass, user.password);
  
    if (!isMatch) {
      throw new UnauthorizedException("Password not match");
    }
    const payload = { id: user.id, isAdmin: user.isAdmin };
    const { password, ...result } = user;
    
        return {
            access_token: this.jwtService.sign(payload),
            result
        };
  }
  
}