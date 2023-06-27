import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';

@Entity()
class RelationGuidesFormations {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Formation, formation => formation.guides)
  @JoinColumn({ name: 'formation_id' })
  formation: Formation;

  @ManyToOne(() => Guide, guide => guide.formations)
  @JoinColumn({ name: 'guide_id' })
  guide: Guide;
}

export default RelationGuidesFormations;
