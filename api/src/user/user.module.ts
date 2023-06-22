import { Module } from '@nestjs/common';
import User from './user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';



@Module({
  imports: [TypeOrmModule.forFeature([User]), 
  JwtModule.registerAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('JWT_SECRET'),
      signOptions: { expiresIn: '1d' },
    }),
  })],
  controllers: [UserController],
  providers: [UserService],
})
export class userModule {}