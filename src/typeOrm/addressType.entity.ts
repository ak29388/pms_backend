import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class AddressType {
    @PrimaryGeneratedColumn({
      type: 'bigint',
      name: 'id',
    })
    id: number;
  
    @Column()
    address_type: string;
  
    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    update_at: Date;
  }
  