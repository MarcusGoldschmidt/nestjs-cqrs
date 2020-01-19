import {ApplicationCommand} from '../../common/cqrs/application.command';
import {IsNumber, Min} from 'class-validator';
import 'reflect-metadata';
import {Type} from 'class-transformer';

export default class UpdateScoreCommand extends ApplicationCommand {

    constructor(
        id: number,
        addScore: number,
    ) {
        super(id);
        this.addScore = addScore;
    }

    @Type(() => Number)
    @IsNumber()
    @Min(0)
    public readonly addScore: number;
}
