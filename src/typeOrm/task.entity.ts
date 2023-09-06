import { Priority, Priority_Label } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  NumericType,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: false })
  task_title: string;

  @Column({ nullable: false })
  start_date: string;

  @Column({ nullable: true })
  end_date: string;

  @Column({
    nullable: false,
    default : '1'
  })
  status: string;

  @Column({
   nullable: true
  })
  Priority_Label: string;

  @Column({ nullable: true })
  assigned_to: string;

  @Column({ nullable: true })
  description: string;

  @Column({ name : 'project_id' })
  project: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project_id) => project_id.task, {onDelete: "CASCADE"})
  @JoinColumn({ name: 'project_id' })
  project_id: Project;
}
