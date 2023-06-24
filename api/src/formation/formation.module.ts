import { Module } from '@nestjs/common';
import {  TypeOrmModule } from '@nestjs/typeorm';
import FormationController from './formation.controller';
import { FormationService } from './formation.service';
import Guide from 'src/guides/guide.entity';
import Formation from './formation.entity';
import RelationGuidesFormations from 'src/relation/relationGuidesFormations.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Guide]),
    TypeOrmModule.forFeature([Formation]),
    TypeOrmModule.forFeature([RelationGuidesFormations])

  ],
  controllers: [FormationController],
  providers: [FormationService],
})
export class FormationModule {}
