import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FormationService } from './formation.service';

export class CreateFormationDto {
    name: string;
    date: string;
    instructor: string;
    guide:[];
  }


@Controller('formation')
class FormationController {
    constructor(private readonly FormationService: FormationService) {}
    // create a new formation
    @Post('/')
    async createFormation(@Body() CreateFormationDto: CreateFormationDto) {
      const newFormation = await this.FormationService.createFormationWithGuides(CreateFormationDto);
      return newFormation;
    }
    // retrieve all formations
    @Get('/')
    async getFormations() {
      const formation = await this.FormationService.getFormationsWithGuides();
      return formation;
    }
    // get one formation by id 
    @Get('/:id')
    async getFormationById(@Param('id') idFormation: number) {
      const validateReservation = await this.FormationService.getFormationById(idFormation);
      return validateReservation;
    }
    // get all attendees by formation id
    @Get('formationAttendees/:id')
    async getFormationAttendees(@Param('id') idFormation: number) {
      // const validateReservation = await this.FormationService.validateSubscribe();
      // return validateReservation;
    }
        // get all formation attended by one user
        @Get('formationAttendees/:id')
        async getFormationUser(@Param('id') idFormation: number) {
          // const validateReservation = await this.FormationService.validateSubscribe();
          // return validateReservation;
        }


}

export default FormationController;
