import {ApplicationHandler, OperationHandler} from "../../common/cqrs/commands/application.handler";
import UpdateScoreCommand from "./update-score.command";
import {UserAggregate} from "../user.aggregate";
import {CommandHandler, EventPublisher} from "@nestjs/cqrs";
import {UserRepository} from "../user.repository";

@CommandHandler(UpdateScoreCommand)
export class UpdateScoreHandler extends ApplicationHandler<UserAggregate, UpdateScoreCommand> {

    constructor(repository: UserRepository, publisher: EventPublisher) {
        super(repository, publisher);
    }

    async applicationExecute(aggregate: UserAggregate, command: UpdateScoreCommand): Promise<OperationHandler> {

        aggregate.updateScore(command.addScore);

        return OperationHandler.UPDATE;
    }
}
