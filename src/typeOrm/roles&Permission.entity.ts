import { Admin, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { AdminTable } from './admin.entity';

@Entity()
export class Roles_And_Permission {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: true,
    type: 'bool',
    name: 'read',
  })
  read: boolean;

  @Column({
    nullable: true,
    type: 'bool',
    name: 'write',
  })
  write: boolean;

  @Column({
    nullable: true,
    type: 'bool',
    name: 'create',
  })
  create: boolean;

  @Column({
    nullable: true,
    type: 'bool',
    name: 'delete',
  })
  delete: boolean;


  @Column({
    nullable: true,
  })
  module: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => AdminTable,
    (admin_id) => admin_id.roles_Permission,{onDelete: "CASCADE"}
  )
  @JoinColumn({name : 'admin_id'})
  admin_id : string;
}
