import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Reporting {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: false })
  project_name: string;

  @Column({
    type: 'bool',
    nullable: false,
  })
  billable: boolean;

  @Column({ nullable: false })
  billable_hours: string;

  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Employee,
    (emp_reporting_id) => emp_reporting_id.reporting,{onDelete: "CASCADE"}
  )
  @JoinColumn({name : 'emp_id'})
  emp_reporting_id : string;
}
