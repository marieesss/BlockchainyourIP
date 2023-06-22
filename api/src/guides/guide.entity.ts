import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  class Guide {
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
  
    @CreateDateColumn()
    public createdAt: Date;
  }
  


  
  export default Guide;