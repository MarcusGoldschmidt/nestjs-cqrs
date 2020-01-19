import {ApplicationEntity} from "../common/cqrs/entity.abstraction";
import {BeforeInsert, Column, Entity, Index} from "typeorm";
import {Permission} from "./enuns/permission.enum";

@Entity('User')
export class UserEntity extends ApplicationEntity {

    @Column()
    name: string;

    @Index('IDX_USER_EMAIL_UNIQUE', {
        unique: true,
    })
    @Column()
    email: string;

    @Column()
    password: string;

    @Column('int')
    permission: Permission;

    @Column({
        default: false,
    })
    verified: boolean;

    @Column()
    rememberToken: string;

    @Column({
        length: 36,
    })
    rememberIp: string;

    @Column()
    score: number;

    @BeforeInsert()
    userTrigger() {
        if (this.score == null) {
            this.score = 0;
        }
        this.verified = false;
    }
}
