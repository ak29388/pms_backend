import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Sourced_From {
    @PrimaryGeneratedColumn({
      type: 'bigint',
      name: 'id',
    })
    id: number;
  
    @Column()
    sourced_from: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    update_at: Date;
  }
  