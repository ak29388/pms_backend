import { Role_And_Permission } from 'src/app/admin/dto/roleAndPermission.dto';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Accounts } from './accounts.entity';
import { EMP_Status } from './employee.entity';
import { Roles_And_Permission } from './roles&Permission.entity';

export enum Admin_Status {
  ACTIVE = 'Active',
  INACTIVE = 'Inactive',
}

export enum Role {
  ADMIN = 'admin',
  EMPLOYEE = 'employee',
  SUB_ADMIN_HR = 'Sub-Admin-HR',
  SUB_ADMIN_BUISNESS = 'Sub-Admin-Business',
}

@Entity()
export class AdminTable {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    type: 'enum',
    enum: Role,
    name: 'role',
  })
  role: Role;

  @Column({nullable : true})
  profile_image: string;

  @Column({
    nullable : true,
    default: 'Active',
    name: 'status',
  })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Accounts , (account_id) => account_id.adminAccount )
  @JoinColumn({ name : 'accounts_id' })
  account_id : number ;

  @OneToMany(() => Roles_And_Permission , (roles_Permission) => roles_Permission.admin_id )
  roles_Permission : Roles_And_Permission[] ;

}
