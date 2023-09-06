import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee, EMP_Status } from './employee.entity';
import * as bcrypt from 'bcrypt';
import { Service_Type } from 'src/helpers/constants';

@Entity()
export class Credentials {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  emp_id: string;

  @Column({
    nullable : true,
  })
  service_type: string;

  @Column()
  service_url: string;

  @Column({
    nullable: false,
  })
  email_user_name: string;

  @Column()
  password: string;

  @Column({
    nullable: false,
  })
  contact_number: string;

  @Column()
  code: string;

  @Column({nullable : true})
  remarks: string;

  @Column()
  status: EMP_Status;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Employee, (employee_id) => employee_id.credentials,{onDelete: "CASCADE"})
  @JoinColumn({ name: 'emp_id' })
  employee_id: Employee;
}
