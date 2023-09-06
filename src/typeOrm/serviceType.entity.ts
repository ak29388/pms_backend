import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class ServiceType {
    @PrimaryGeneratedColumn({
      type: 'bigint',
      name: 'id',
    })
    id: number;
  
    @Column()
    service_type: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    update_at: Date;
  }
  