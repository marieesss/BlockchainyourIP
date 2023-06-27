import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { FormationService } from './formation.service';
import { AdminGuard, AuthGuard } from 'src/Auth.service';

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
    @UseGuards(AdminGuard)
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



}

export default FormationController;
