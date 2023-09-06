import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Milestone_Status {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  milestone_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  update_at: Date;
}
