import { type } from 'os';
import {
  Platform_enum,
  Project_Condition_Enum,
  Project_Phase_ENUM,
  Project_status,
  Project_Type_Enum,
  Sourced_From,
} from 'src/helpers/constants';
import {
  Column,
  PrimaryGeneratedColumn,
  Entity,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from 'typeorm';
import { Request_Module } from './changeRequest.entity';
import { Employee } from './employee.entity';
import { Milestone_Assignee } from './milestone_assignee.entity';
import { ProjectAssignee } from './projectAssignee.entity';
import { ProjectDocument } from './projectDocument.entity';
import { ProjectMilestone } from './projectMilestone.entity';
import { Task } from './task.entity';

@Entity()
export class Project {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  name: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  start_date: string;

  @Column({
    nullable: true,
    type: 'date',
  })
  end_date: string;

  @Column({ nullable: true })
  url: string;

  @Column({ nullable: true })
  client_name: string;

  @Column({ nullable: true })
  hired_id: string;

  @Column({ nullable: true })
  no_of_hours: string;

  @Column({ nullable: true })
  budget: string;

  @Column({
    nullable: true,
  })
  app_name: string;

  @Column({
    default: 'Active',
    nullable: false,
    type: 'enum',
    enum: Project_status,
    name: 'status',
  })
  status: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Platform_enum,
    name: 'platform'
  })
  platform: string;

  @Column({ nullable: true })
  notes: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Project_Type_Enum,
    name: 'project_type',
  })
  project_type: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Project_Condition_Enum,
    name: 'project_condition',
  })
  project_condition: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Project_Phase_ENUM,
    name: 'project_phase',
  })
  project_phase: Project_Phase_ENUM;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({
    type: 'enum',
    enum: Sourced_From,
    name: 'sourced_from',
    nullable: true
  })
  sourced_from: string;

  @Column({
    name: 'emp_id',
    nullable: true
  })
  employee :string ;

  @ManyToOne(() => Employee, (emp_id) => emp_id.project, { onDelete: "CASCADE" })
  @JoinColumn({ name: 'emp_id' })
  emp_id: Employee;

  @OneToMany(
    () => ProjectDocument,
    (projectDocument) => projectDocument.project_id,
  )
  projectDocument: ProjectDocument[];

  @OneToMany(
    () => ProjectAssignee,
    (project_Assignee) => project_Assignee.project_id,
  )
  project_Assignee: ProjectAssignee[];

  @OneToMany(
    () => ProjectMilestone,
    (project_milestone) => project_milestone.project_id,
  )
  project_milestone: ProjectMilestone[];

  @OneToMany(() => Task, (task) => task.project_id)
  task: Task[];

  @OneToMany(() => Request_Module, (projectModule) => projectModule.project_id)
  projectModule: Request_Module[];


  @OneToMany(() => Milestone_Assignee, (projectMilestoneAssignee) => projectMilestoneAssignee.project_id)
  projectMilestoneAssignee: Milestone_Assignee[];

}
