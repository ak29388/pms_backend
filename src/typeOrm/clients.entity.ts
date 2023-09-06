import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Clients {
    @PrimaryGeneratedColumn({
        type : 'bigint',
        name : 'id',
    })
    id : number;

    @Column({nullable : false})
    name : string;

    @Column({nullable : false})
    email : string;

    @Column({nullable : false})
    contact : string;

    @Column({nullable : true})
    address : string;

    @Column({nullable : true})
    skype_id ?: string;

    @Column({nullable : true})
    slack_id ?: string;

    @CreateDateColumn()
    created_at : Date;

    @UpdateDateColumn()
     updated_at : Date;
}