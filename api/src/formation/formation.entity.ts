import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
class Formation {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column({ type: 'date' })
  public date: Date;

  @Column()
  public instructor: string;

  @CreateDateColumn()
  public createdAt: Date;
}
export default Formation;