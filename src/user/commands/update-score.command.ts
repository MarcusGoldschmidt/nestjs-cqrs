import {IApplicationCommand} from "../../common/cqrs/abstractions/interfaces";
import {IsNumberString} from "class-validator";

export default class UpdateScoreCommand extends IApplicationCommand {
    @IsNumberString()
    addScore: number;
}
