import { MilestoneLinksStatus } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectMilestone } from './projectMilestone.entity';

@Entity()
export class MilestonesLinks {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  link_title: string;

  @Column()
  link_url: string;

  // @Column({
  //   type: 'enum',
  //   enum: MilestoneLinksStatus,
  //   name: 'status',
  // })
  // status: MilestoneLinksStatus;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(
    () => ProjectMilestone,
    (milestone_id) => milestone_id.projectMilestone,{onDelete: "CASCADE"}
  )
  @JoinColumn({
    name: 'milestone_id',
  })
  milestone_id: number ;
}
