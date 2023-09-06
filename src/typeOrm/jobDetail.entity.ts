import { Department } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Employee, EMP_Status } from './employee.entity';

export enum Designation {
  ProjectManager = 'Project Manager',
  iOSTeamLead = 'iOS Team Lead',
  AndroidTeamLead = 'Android Team Lead',
  BackendTeamLead = 'Backend Team Lead',
  WebTeamLead = 'Web Team Lead',
  Sr_SoftwareDeveloper = 'Sr. Software Developer',
  AssistanceSoftwareDeveloper = 'Assistance Software Developer',
  QualityAnalyst = 'Quality Analyst',
  BusinessDevelopmentExecutive = 'Business Development Executive',
  BusinessManager = 'Business Manager',
  Trainee = 'Trainee',
  ProjectCoordinators = 'Project Coordinators',
  IT_Admin = 'IT-Admin',
  Sr_UI_UXEngineer = 'Sr. UI/UX Engineer',
  UI_UXEngineer = 'UI/UX Engineer',
  HRManager = 'HR Manager',
  HRRecruiter = 'HR Recruiter',
  HRIntern = 'HR Intern',
  HousekeepingManager = 'Housekeeping Manager',
  Housekeeping = 'Housekeeping',
}

@Entity()
export class JobDetails {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  // @Column({nullable : true})
  // emp_id: string;

  @Column()
  date_of_joinig: string;

  @Column({ nullable: true })
  date_of_leaving: string;

  @Column({
    nullable : true
  })
  designation: number;

  @Column({
   nullable : true
  })
  department: number;

  @Column({nullable : true})
  job_status: EMP_Status;

  @Column({nullable: true})
  Reporting_manager: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => Employee,
    (emp_id) => emp_id.employee_job,{onDelete: "CASCADE"}
  )
  @JoinColumn({name : 'emp_id'})
  emp_id : string;
}
