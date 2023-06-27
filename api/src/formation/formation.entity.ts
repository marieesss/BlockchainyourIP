import Guide from 'src/guides/guide.entity';
import User from 'src/user/user.entity';
import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Formation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'date' })
  public date: Date;

  @Column()
  public instructor: string;

  @ManyToMany(() => Guide, guide => guide.formations)
  @JoinTable({ name: 'formation_guide', joinColumn: { name: 'formation_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'guide_id', referencedColumnName: 'id' } })
  guides: Guide[];

  @ManyToMany(() => User, user => user.formations)
  @JoinTable({ name: 'relation_formation_attendees', joinColumn: { name: 'formation_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'user_id', referencedColumnName: 'id' } })
  users: User[];

  @CreateDateColumn()
  public createdAt: Date;
}

export default Formation;
