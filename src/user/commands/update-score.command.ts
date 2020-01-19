import {IApplicationCommand} from "../../common/cqrs/interfaces";
import {IsNumber, Min} from "class-validator";
import 'reflect-metadata';
import {Type} from "class-transformer";

export default class UpdateScoreCommand extends IApplicationCommand {

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    addScore: number;
}
