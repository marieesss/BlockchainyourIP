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
  
    @Column()
    public username: string;
    @Column()
    public email: string;
    @Column()
    public password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  }
  
  export default User;