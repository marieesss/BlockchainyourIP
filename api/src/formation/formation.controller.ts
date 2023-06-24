import { Body, Controller, Post, Put } from '@nestjs/common';
import { FormationService } from './formation.service';
import { Request, Response } from 'express';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';
import RelationGuidesFormations from 'src/relation/relationAttendeesFormation';

export class CreateFormationDto {
    name: string;
    date: string;
    instructor: string;
    guide:[];
  }

  export class subscribeFormation{
    name: string;
    date: string;
    instructor: string;
    guide:[];
  }

@Controller('formation')
class FormationController {
    constructor(private readonly FormationService: FormationService) {}
    @Post('/')
    async createFormation(@Body() CreateFormationDto: CreateFormationDto) {
      const newUser = await this.FormationService.createFormationWithGuides(CreateFormationDto);
      return newUser;
    }
    @Post('/inscription')
    async createReservation(@Body() CreateFormationDto: CreateFormationDto) {
      const newUser = await this.FormationService.createFormationWithGuides(CreateFormationDto);
      return newUser;
    }
    @Put('/validation')
    async validateFormation(@Body() validation: boolean) {
      const newUser = await this.FormationService.createFormationWithGuides(validation);
      return newUser;
    }

}

export default FormationController;
