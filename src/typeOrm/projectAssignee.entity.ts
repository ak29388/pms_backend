import {
  Project_Role,
  Project_status,
  Project_Team_Status,
} from 'src/helpers/constants';
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
import { Project } from './project.entity';
import { Employee, EMP_Status } from './employee.entity';
import { Milestone_Assignee } from './milestone_assignee.entity';

@Entity()
export class ProjectAssignee {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    type: 'enum',
    enum: Project_Team_Status,
    name: 'status',
    default: Project_Team_Status.ASSIGNED,
  })
  status: Project_Team_Status;

  @Column({
    type: 'enum',
    enum: Project_Role,
    name: 'role',
  })
  role: string;

  @Column({name :'project_id'})
  project : number ;

  @Column({name :'emp_id'})
  employee : string ;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project_id) => project_id.project_Assignee,{onDelete: "CASCADE"})
  @JoinColumn({ name: 'project_id' })
  project_id: Project;

  @ManyToOne(() => Employee, (emp_id) => emp_id.employeeAssignee,{onDelete: "CASCADE"})
  @JoinColumn({ name: 'emp_id' })
  emp_id: Employee;

  @OneToMany(() => Milestone_Assignee ,(projectAssignee) => projectAssignee.team_id , {onDelete:'CASCADE'})
  projectAssignee : Milestone_Assignee[];

}
