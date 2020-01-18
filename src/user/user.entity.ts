import {ApplicationEntity} from "../common/cqrs/abstractions/entity.abstraction";
import {BeforeInsert, Column, Entity} from "typeorm";

@Entity('User')
export class UserEntity extends ApplicationEntity {

    @Column()
    name: string;

    @Column()
    score: number;

    @BeforeInsert()
    userTrigger() {
        if (this.score == null) {
            this.score = 0;
        }
    }
}
