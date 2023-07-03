import { Module } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { AttendeesController } from './attendees.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Formation from 'src/formation/formation.entity';
import relationAttendeesFormation from 'src/attendees/entities/relationAttendeesFormation.entity';
import User from 'src/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports:[
    ConfigModule,
    TypeOrmModule.forFeature([Formation]),
    TypeOrmModule.forFeature([relationAttendeesFormation]),
    TypeOrmModule.forFeature([User])
  ],
  controllers: [AttendeesController],
  providers: [AttendeesService, ConfigService]
})
export class AttendeesModule {}
