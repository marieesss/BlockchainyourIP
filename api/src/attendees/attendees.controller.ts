import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { AttendeesService } from './attendees.service';
import { CreateReservationDTO } from './dto/create-attendee.dto';
import { UserGuard } from 'src/Auth.service';


@Controller('attendees')
export class AttendeesController {
  constructor(private readonly attendeesService: AttendeesService) {}

    //subscribe to a new formation
    @Post('/:id')
   @UseGuards(UserGuard)
    async createReservation(@Body() CreateReservationDTO: CreateReservationDTO, @Param('id') idUser: number) {
      const newReservation = await this.attendeesService.subscribeFormation(CreateReservationDTO, idUser);
      return newReservation;
    }
    //validate the reservation, valide value turns to true
    @Put('/:idReservation/:id')
    @UseGuards(UserGuard)
    async validateFormation(@Param('idReservation') idReservation: number, @Param('id') idUser: number, @Body('motivation') motivation: string) {
      const validateReservation = await this.attendeesService.validateSubscribe(idReservation, motivation);
      return validateReservation;
    }

    @Get('/:id')
   @UseGuards(UserGuard)
    async getAllFormationsByUserId(@Param('id') idUser: number) {
      const getAll = await this.attendeesService.getAllFormationsByUserId(idUser);
      return getAll;
    }


  




}
