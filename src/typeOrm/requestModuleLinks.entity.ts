import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Request_Module } from "./changeRequest.entity";

@Entity()
export class RequestModuleLinks{
    @PrimaryGeneratedColumn({
        type: 'bigint',
        name: 'id',
      })
      id: number;
    

      @Column({nullable: true})
      link_title: string;
    
      @Column({nullable : true})
      link_url: string;

      @CreateDateColumn()
      created_at: Date;
    
      @UpdateDateColumn()
      updated_at: Date;

    @ManyToOne(() => Request_Module , (module_id) => module_id.requestModule , {onDelete : "CASCADE"})
    @JoinColumn( {name :'module_id'})
    module_id : number;
}