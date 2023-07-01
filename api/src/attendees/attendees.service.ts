import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationDTO } from './dto/create-attendee.dto';
import relationAttendeesFormation from 'src/relation/relationAttendeesFormation.entity';
import Formation from 'src/formation/formation.entity';

import User from 'src/user/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AttendeesService {
  constructor(
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
     @InjectRepository(relationAttendeesFormation)
    private relationAttendeeRepository: Repository<relationAttendeesFormation>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async subscribeFormation(CreateReservationDTO, idUser){
    const { formation, user, motivation} = CreateReservationDTO;
    try {
      const inscription = new relationAttendeesFormation();
      inscription.motivation= motivation;

      
      // Charger les formations à partir des identifiants et les assigner à la formation
      const loadedFormation = await this.formationRepository.findOne({where :{ id: formation }}); 
      inscription.formation= loadedFormation
        // Charger les formations à partir des identifiants et les assigner à la formation
        const loadedUser = await this.UserRepository.findOne({where :{ id: user }}); 
        inscription.user = loadedUser
      const savedInscrption= await this.relationAttendeeRepository.create(inscription)
      await this.relationAttendeeRepository.save(savedInscrption)
      return savedInscrption

    } catch (error) {
      throw error
    }

  }


  async validateSubscribe(idReservation, motivation) {
    try {
      const reservation= await this.relationAttendeeRepository.findOne({where :{ id: idReservation }});
      const update = await this.relationAttendeeRepository.save({...reservation, valide :true, motivation:motivation})
      return update
    } catch (error) {
      throw error
    }   
}


async getAllFormationsByUserId(userId: number) {
  const relations = await this.relationAttendeeRepository
  // crée un alias
  .createQueryBuilder('rl')
  //left join entre la table rl et formation
  .leftJoinAndSelect('rl.formation', 'formation')
  .leftJoinAndSelect('rl.user', 'user')
  // condition, que retrouver les formations où l'utilisateur est inscrit
  .where('rl.user_id = :userId', { userId })
  //récupérer plusieurs 
  .getMany();

return relations;
  
}




}
