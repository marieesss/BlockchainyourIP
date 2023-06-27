import Formation from 'src/formation/formation.entity';
import {
    Column,
    CreateDateColumn,
    Entity,
    JoinTable,
    ManyToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  class User {
    @PrimaryGeneratedColumn()
    public id: number;
  
    @Column({ type: 'varchar', length: 300 })
    public username: string;
    @Column({ type: 'varchar', length: 300 ,unique: true })
    public email: string;
    @Column()
    public password: string;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @ManyToMany(() => Formation, formation => formation.users)
    @JoinTable({ name: 'relation_formation_attendees', joinColumn: { name: 'user_id', referencedColumnName: 'id' }, inverseJoinColumn: { name: 'formation_id', referencedColumnName: 'id' } })
    formations: Formation[]; 

    @CreateDateColumn()
    createdAt: Date;
  }
  
  export default User;
