import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';
import RelationGuidesFormations from 'src/relation/relationGuidesFormations.entity';
import relationAttendeesFormation from 'src/relation/relationAttendeesFormation.entity';
import User from 'src/user/user.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
    @InjectRepository(RelationGuidesFormations)
    private relationRepository: Repository<RelationGuidesFormations>,
    @InjectRepository(relationAttendeesFormation)
    private relationAttendeeRepository: Repository<relationAttendeesFormation>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createFormationWithGuides(createFormationDto): Promise<Formation> {
    const { name, date, instructor, guides } = createFormationDto;
  
    try {
      // Créer la nouvelle formation
      const formation = new Formation();
      formation.name = name;
      formation.date = new Date(date);
      formation.instructor = instructor;
    
      // Charger les guides à partir des identifiants et les assigner à la formation
      const loadedGuides = await this.guideRepository.findByIds(guides); // Supposons que vous ayez un référentiel (repository) pour la classe "Guide" nommé "guideRepository"
      formation.guides = loadedGuides;
    
      const savedFormation = await this.formationRepository.save(formation);

      return savedFormation;
    } catch (error) {
      throw error;
    }
  }


async getFormationsWithGuides(): Promise<Formation[]> {
  const formations = await this.formationRepository.createQueryBuilder('formation')
    .leftJoinAndSelect('formation.guides', 'guide')
    .getMany();

  return formations;
}

async getFormationById(id): Promise<Formation> {
  const formation = await this.formationRepository.findOne({ where: { id }, relations: ['guides'] });
  return formation;
}








}
