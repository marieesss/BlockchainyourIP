import Formation from 'src/formation/formation.entity';
import User from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinColumn,ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class relationAttendeesFormation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 400})
  public motivation: string;

  @Column({ type: 'boolean', default: false })
  public valide: boolean;

  @ManyToOne(() => Formation, formation => formation.guides)
  @JoinColumn({ name: 'formation_id' })
  formation: Formation;
  
  @ManyToOne(() => User, user => user.formations)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @CreateDateColumn()
  public createdAt: Date;
}

export default relationAttendeesFormation;
