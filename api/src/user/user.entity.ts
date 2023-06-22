import {
    Column,
    CreateDateColumn,
    Entity,
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
  
    @CreateDateColumn()
    createdAt: Date;

    
  }
  
  export default User;