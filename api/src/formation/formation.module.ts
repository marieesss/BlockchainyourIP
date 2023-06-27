import { Module } from '@nestjs/common';
import {  TypeOrmModule } from '@nestjs/typeorm';
import FormationController from './formation.controller';
import { FormationService } from './formation.service';
import Guide from 'src/guides/guide.entity';
import Formation from './formation.entity';
import RelationGuidesFormations from 'src/relation/relationGuidesFormations.entity';
import relationAttendeesFormation from 'src/relation/relationAttendeesFormation.entity';
import User from 'src/user/user.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([Guide]),
    TypeOrmModule.forFeature([Formation]),
    TypeOrmModule.forFeature([RelationGuidesFormations]),
    TypeOrmModule.forFeature([relationAttendeesFormation]),
    TypeOrmModule.forFeature([User])


  ],
  controllers: [FormationController],
  providers: [FormationService, ConfigService],
})
export class FormationModule {}
