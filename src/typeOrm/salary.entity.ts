import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee } from './employee.entity';

@Entity()
export class Salary {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: true })
  basic_salary: string;

  @Column({ nullable: true })
  effective_date: string;

  @Column({ nullable: true })
  add_amount: string;

  @Column({ nullable: true })
  add_amount_comment: string;

  @Column({ nullable: true })
  add_deduction_amount: string;

  @Column({ nullable: true })
  add_deduction_comment: string;

  @Column({nullable : true})
  next_review_date: string;

  @Column({ nullable: true })
  bank_account: string;

  @Column({ nullable: true })
  branch_name: string;

  @Column({ nullable: true })
  ifsc_code: string;

  @Column({ nullable: true })
  last_CTC: string;

  @Column({ nullable: true })
  inHand_Salary: string;

  @Column({ nullable: true })
  mode_Of_Payment: string;

  @Column({ nullable: true })
  last_salary_Date: string;


  @Column({nullable : true})
  last_salary_hike : string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Employee, (emp_id) => emp_id.salary, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'emp_id' })
  emp_id: Employee;
}
