import { AccountRole, Account_Status } from 'src/helpers/constants';
import {
  Admin,
  Column,
  CreateDateColumn,
  Entity,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { AdminTable } from './admin.entity';
import { Employee, EMP_Status, Role } from './employee.entity';

@Entity()
export class Accounts {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({nullable : false})
  email: string;

  @Column({nullable : false})
  password: string;

  @Column({
    type: 'enum',
    enum: AccountRole,
    name: 'roles',
  })
  roles: AccountRole;

  @Column({
    type: 'enum',
    enum: Account_Status,
    name: 'status',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Employee, (employeesAccount) => employeesAccount.account_id , {onDelete: "CASCADE"})
  employeesAccount: Employee;

  @OneToOne(() => AdminTable, (adminAccount) => adminAccount.account_id , {onDelete: "CASCADE"})
  adminAccount: AdminTable;
}
