import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Project } from "./project.entity";
import { ProjectAssignee } from "./projectAssignee.entity";
import { ProjectMilestone } from "./projectMilestone.entity";

@Entity()
export class Milestone_Assignee {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    @Column({
        nullable : true,
       
    })
    milestone_name: string;

    @Column({
        nullable : true,
    })
    assignee_id: string;


    @ManyToOne(() => ProjectAssignee, (team_id) => team_id.projectAssignee, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'team_id' })
    team_id: string;

    @ManyToOne(() => ProjectMilestone, (milestone_id) => milestone_id.project_milestone_assignee ,{onDelete: "CASCADE"})
    @JoinColumn({ name: 'milestone_id' })
    milestone_id: number;

    @ManyToOne(() => Project, (project_id) => project_id.projectMilestoneAssignee ,{onDelete: "CASCADE"})
    @JoinColumn({ name: 'project_id' })
    project_id: number;
}