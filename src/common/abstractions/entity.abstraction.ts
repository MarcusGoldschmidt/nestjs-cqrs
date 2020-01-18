import {PrimaryGeneratedColumn} from "typeorm";

export abstract class AplicationEntity {
    @PrimaryGeneratedColumn()
    id: number;
}
