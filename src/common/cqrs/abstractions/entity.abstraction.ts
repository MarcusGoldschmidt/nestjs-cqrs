import {BeforeInsert, BeforeUpdate, Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class ApplicationEntity {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    createdAt: Date;

    @Column()
    updateAt: Date;

    @BeforeInsert()
    createdAtTrigger() {
        this.createdAt = new Date();
    }

    @BeforeUpdate()
    updatedAtTrigger() {
        this.updateAt = new Date();
    }
}
