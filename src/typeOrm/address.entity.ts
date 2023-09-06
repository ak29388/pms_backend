import { type } from 'os';
import { AddressType } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee, EMP_Status } from './employee.entity';

@Entity()
export class Address {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: false })
  emp_id: string;

  @Column({
    nullable: true,
    type: 'enum',
    enum: AddressType,
    name: 'address_type'
  })
  address_type: AddressType;

  @Column({ nullable: true })
  address_line_one: string;

  @Column({ nullable: true })
  address_line_two: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  state: string;

  @Column({ nullable: true })
  postalcode: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: EMP_Status,
    default: EMP_Status.ACTIVE,
    name: 'status',
  })
  status: string;

  @Column({
    type: 'bool',
    nullable: true,
    name : 'isSameAddress'
  })
  isSameAddress: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
