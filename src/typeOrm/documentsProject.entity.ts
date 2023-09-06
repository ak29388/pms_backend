import { Document_type } from 'src/helpers/constants';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Project } from './project.entity';

@Entity()
export class ProjectDocumentUpload {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({
nullable : true
  })
  document_type: string;

  @Column()
  document_url: string;

  @Column({name: 'project_id'})
  project: string;


  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @ManyToOne(() => Project, (project_id) => project_id.projectDocument,{onDelete: "CASCADE"})
  @JoinColumn({ name: 'project_id' })
  project_id: string;
}
