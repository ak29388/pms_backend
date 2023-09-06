import { Column, CreateDateColumn, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Employee } from "./employee.entity";

@Entity()
export class Remarks {
    @PrimaryGeneratedColumn({
        type : 'bigint',
        name : 'id'
    })
    id : number ;

    @Column({
        nullable: false
    })
    remarks : string ;

    @CreateDateColumn()
    created_at : Date ;

    @UpdateDateColumn()
    updated_at : Date ;

    @ManyToOne(()=> Employee , employee_id => employee_id.employee ,{onDelete: "CASCADE"})
    @JoinColumn({ name : 'emp_id'})
    employee_id : string ;
}