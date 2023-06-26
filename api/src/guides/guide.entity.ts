import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Formation } from 'src/formation/formation.entity';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public title: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public summary: string;

  @Column({ type: 'varchar', length: 300, nullable: false })
  public author: string;

  @Column({ type: 'float', nullable: false })
  public rating: number;

  @ManyToMany(() => Formation, formation => formation.guides)
  public formations: Formation[];

  @CreateDateColumn()
  public createdAt: Date;
}

export default Guide;
