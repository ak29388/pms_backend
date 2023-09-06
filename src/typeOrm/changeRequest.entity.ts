import { flatten } from '@nestjs/common';
import { type } from 'os';
import { Document_type } from 'src/helpers/constants';
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
import { RequestModuleLinks } from './requestModuleLinks.entity';

@Entity()
export class Request_Module {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'bool' })
  client_approved: boolean;

  @Column()
  no_of_hours: string;

  @Column({name :'project_id'})
  project: string;
  
  @Column()
  description: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => RequestModuleLinks , (requestModule) => requestModule.module_id)
  requestModule : RequestModuleLinks[];

  @ManyToOne(() => Project , (project_id) => project_id.projectModule,{ onDelete: "CASCADE" } )
    @JoinColumn( {name :'project_id'})
    project_id : Project;
}
