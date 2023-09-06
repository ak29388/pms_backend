import { Priority } from 'src/helpers/constants';
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
import { Employee } from './employee.entity';
import { MilestonesLinks } from './projectMilestonesLinks.entity';
import { Milestone_Priority } from './milestone_priority.entity';
import { Milestone_Assignee } from './milestone_assignee.entity';

@Entity()
export class ProjectMilestone {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column()
  milestone_detail: string;

  @Column({
   nullable : true,
   type: 'enum',
   enum : Priority,
   name :'priority'
  })
  priority: string;

  @Column()
  start_date: string;

  @Column()
  due_date: string;
  
  @Column({ default : '1'})
  status : string

  @Column({ name : 'project_id'})
  project : number;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(
    () => MilestonesLinks,
    (projectMilestone) => projectMilestone.milestone_id,
  )
  projectMilestone: MilestonesLinks[];

  @ManyToOne(() => Project, (project_id) => project_id.project_milestone ,{onDelete: "CASCADE"})
  @JoinColumn({ name: 'project_id' })
  project_id: Project;
  

  // @ManyToOne(() => Employee, (emp_id) => emp_id.assigneeId ,{onDelete: "CASCADE"})
  // @JoinColumn({ name: 'emp_id' })
  // emp_id: Employee;

  // @OneToMany(
  //     () => Milestone_Assignee,
  //     (milestone_assignee) => milestone_assignee.assignee_id,
  //   )
  //   milestone_assignee: string;

    @OneToMany(() => Milestone_Assignee , (project_milestone_assignee) => project_milestone_assignee.milestone_id)
    project_milestone_assignee : Milestone_Assignee[];
}
