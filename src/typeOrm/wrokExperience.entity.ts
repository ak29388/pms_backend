import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class WorkExperience {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  emp_id: string;

  @Column()
  job_title: string;

  @Column()
  start_date: string;

  @Column()
  end_date: string;

  @Column()
  total_work_experience: string;

  @Column()
  company_name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
