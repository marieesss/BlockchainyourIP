import { NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import User from './user.entity';
import { CreateUserDto } from './user.controller';

export class UserService {
  constructor(
    @InjectRepository(User)
    private UserRepository: Repository<User>,
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

  async createUser(userData: CreateUserDto) {
    const newUser = await this.UserRepository.create(userData);
    await this.UserRepository.save(newUser);
    return newUser;
  }
}