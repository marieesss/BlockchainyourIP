import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';
import RelationGuidesFormations from 'src/relation/relationGuidesFormations.entity';

@Injectable()
export class FormationService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
    @InjectRepository(Formation)
    private formationRepository: Repository<Formation>,
    @InjectRepository(RelationGuidesFormations)
    private relationRepository: Repository<RelationGuidesFormations>,
  ) {}

  async createFormationWithGuides(createFormationDto): Promise<Formation> {
    console.log(createFormationDto)
    const { name, date, instructor, guide} = createFormationDto;

    try {
      // Créer la nouvelle formation
      const formation = new Formation();
      formation.name = name;
      formation.date = new Date(date);
      formation.instructor = instructor;

      const savedFormation = await this.formationRepository.create(formation);
      await this.formationRepository.save(savedFormation)
      console.log(guide)


      for (const guideId of guide) {
        const guide = await this.guideRepository.findOne({where :{ id: guideId }});

        if (guide) {
          const relation = new RelationGuidesFormations();
          relation.formation = savedFormation.id;
          relation.guide = guideId;
          try { 
            const guiderelatedformation = await this.relationRepository.create(relation);
            await this.relationRepository.save(guiderelatedformation)
            
          } catch (error) {
            throw error
            
          }
          
        }
      }
      return savedFormation;
    } catch (error) {
      throw error;
    }
  }
}
