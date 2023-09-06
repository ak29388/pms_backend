import { Api_Log_Type, Module_Type } from "src/helpers/constants";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class LogActivity {

    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id'
    })
    id: number;

    @Column({
        type: 'enum',
        enum: Api_Log_Type,
        name: 'type'
    })
    type: Api_Log_Type

    @Column({
        nullable : true
    })
    id_admin : number ;

    @Column({
        nullable : true
    })
    admin_name : string ;

    @Column({
        nullable : true
    })
    project_id : number ;

    @Column({
        nullable : true
    })
    employee_id : string ;

    @Column({
        nullable : true
    })
    is_employee : boolean ;

    @Column({
        nullable : true
    })
    employee_name : string ;

    @Column({
        type : 'enum',
        enum :Module_Type,
        name : 'sub_module_type'
    })
    sub_module_type : Module_Type ;

    @Column({
        type : 'simple-json'
    })
    value: string;

    @Column({
        type : 'enum',
        enum :Module_Type,
        name : 'module_type'
    })
    module_type: string;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
    updated_at : Date;
}