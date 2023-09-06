import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Education {
  @PrimaryGeneratedColumn({
    type: 'bigint',
    name: 'id',
  })
  id: number;

  @Column()
  emp_id: string;

  @Column()
  qualification: string;

  @Column()
  field_of_education: string;

  @Column()
  completion_year: string;

  @Column()
  education_type: string;

  @Column()
  result: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
