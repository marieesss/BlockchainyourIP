import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Formation from 'src/formation/formation.entity';
import Guide from 'src/guides/guide.entity';

@Entity()
class RelationGuidesFormations {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne(() => Formation, formation => formation.id)
  public formation: number;

  @ManyToOne(() => Guide, guide => guide.id)
  public guide: number;
}

export default RelationGuidesFormations;
