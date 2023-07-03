import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
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


  //récupérer toute les formations avec les guides 
async getFormationsWithGuides(): Promise<Formation[]> {
  const formations = await this.formationRepository.createQueryBuilder('formation')
    .leftJoinAndSelect('formation.guides', 'guide')
    .getMany();

  return formations;
}


//avoir la formation par id
async getFormationById(id): Promise<Formation> {
  const formation = await this.formationRepository.findOne({ where: { id }, relations: ['guides'] });
  return formation;
}








}
