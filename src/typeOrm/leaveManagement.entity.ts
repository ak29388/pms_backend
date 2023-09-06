import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class LeaveManagement {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
    nullable: false,
  })
  employee_name: string;

  @Column({
    nullable: false,
  })
  leave_type: string;

  @Column({
    nullable: false,
  })
  from_date: string;

  @Column({
    nullable: false,
  })
  from_date_duration: string;

  @Column({
    nullable: false,
  })
  end_date: string;

  @Column({
    nullable: false,
  })
  end_date_duration: string;

  @Column({
    nullable: false,
  })
  approved_by: string;

  @Column({
    nullable: false,
  })
  reason: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
