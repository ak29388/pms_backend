import { Department } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { Project } from './project.entity';
import { Credentials } from './credentials.entity';
import { Designation, JobDetails } from './jobDetail.entity';
import { ProjectAssignee } from './projectAssignee.entity';
import { ProjectMilestone } from './projectMilestone.entity';
import { Remarks } from './remarks.entity';
import { Reporting } from './reporting.entity';
import { Salary } from './salary.entity';

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SUB_ADMIN_HR = 'Sub-Admin-HR',
  SUB_ADMIN_BUISNESS = 'Sub-Admin-Business',
}

export enum EmployeeGender {
  MAN = 'man',
  WOMAN = 'woman',
}

export enum EMP_Status {
  ACTIVE = 'Active',
  LEFT = 'Left',
  TERMINATED = 'Terminated',
  RESIGNED = 'Resigned',
  DELETED = 'Deleted',
}

@Entity()
export class Employee {
  @PrimaryColumn({
    name: 'id',
  })
  id: string;



  @Column({ nullable: false })
  first_name: string;

  @Column({ nullable: false })
  last_name: string;

  @Column({ nullable: true })
  profile_image: string;

  @Column({
    nullable: false,
    type: 'enum',
    enum: Role,
    name: 'role',
  })
  role: string;

  @Column({
  nullable: false,
  })
  gender: string;

  @Column({ nullable: false })
  date_of_birth: string;

  @Column({ nullable: true })
  blood_group: string;

  @Column({ nullable: true })
  martial_status: string;

  @Column({ nullable: false })
  contact_number: string;

  @Column({ nullable: true })
  emergency_contact_number: string;

  @Column({ nullable: true })
  whatsapp_number: string;

  @Column({ nullable: false })
  email: string;

  @Column({ nullable: true })
  udid: string;

  @Column({ nullable: true })
  old_id: string;


  @Column({
    nullable: true,
  })
  pan_no: string;


  @Column({
    nullable: false,
    type: 'enum',
    enum: EMP_Status,
    default: EMP_Status.ACTIVE,
    name: 'status',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => Project, (project) => project.emp_id)
  project: Project[];

  @OneToMany(() => JobDetails, (employee_job) => employee_job.emp_id)
  employee_job: JobDetails[];

  @OneToMany(() => Credentials, (credentials) => credentials.employee_id)
  credentials: Credentials[];


  @OneToMany(
    () => ProjectAssignee,
    (employeeAssignee) => employeeAssignee.emp_id,
  )
  employeeAssignee: ProjectAssignee[];

  // @OneToMany(
  //   () => ProjectMilestone,
  //   (assigneeId) => assigneeId.emp_id,
  // )
  // assigneeId: ProjectMilestone[];

  @OneToOne(() => Salary, (salary) => salary.emp_id)
  salary: Salary;

  @OneToOne(() => Accounts, (account_id) => account_id.employeesAccount)
  @JoinColumn({ name: 'account_id' })
  account_id: number;


  @OneToMany(
    () => Remarks,
    (employee) => employee.employee_id,
  )
  employee: Remarks[];

  @OneToMany(
    () => Reporting,
    (reporting) => reporting.emp_reporting_id,
  )
  reporting: Reporting;

  static validationMessages = {
    official_email: "The username must be at least 6 characters long",
  };
}
