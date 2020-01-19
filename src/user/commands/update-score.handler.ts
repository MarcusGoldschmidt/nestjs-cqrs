import {CommandHandler, EventPublisher} from "@nestjs/cqrs";
import UpdateScoreCommand from "./update-score.command";
import {ApplicationHandler, OperationHandler} from "../../common/cqrs/application.handler";
import {UserAggregate} from "../user.aggregate";
import {UserRepository} from "../user.repository";
import {ErrorsHandler} from "../../common/cqrs/error";

@CommandHandler(UpdateScoreCommand)
export class UpdateScoreHandler extends ApplicationHandler<UserAggregate, UpdateScoreCommand> {

    constructor(
        repository: UserRepository,
        publisher: EventPublisher) {
        super(repository, publisher, OperationHandler.UPDATE);
    }

    async applicationExecute(aggregate: UserAggregate, command: UpdateScoreCommand, error: ErrorsHandler): Promise<OperationHandler> {

        aggregate.updateScore(command.addScore);

        return OperationHandler.UPDATE;
    }
}
