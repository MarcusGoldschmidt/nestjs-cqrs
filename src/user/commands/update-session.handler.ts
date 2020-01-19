import {ApplicationHandler, OperationHandler} from "../../common/cqrs/application.handler";
import UpdateScoreCommand from "./update-score.command";
import {UserAggregate} from "../user.aggregate";
import {CommandHandler, EventPublisher} from "@nestjs/cqrs";
import {UserRepository} from "../user.repository";
import UpdateSessionCommand from "./update-session.command";
import {ErrorsHandler} from "../../common/cqrs/error";

@CommandHandler(UpdateScoreCommand)
export class UpdateScoreHandler extends ApplicationHandler<UserAggregate, UpdateSessionCommand> {

    constructor(
        repository: UserRepository,
        publisher: EventPublisher,) {
        super(repository, publisher, OperationHandler.UPDATE);
    }

    async applicationExecute(aggregate: UserAggregate, command: UpdateSessionCommand, error: ErrorsHandler): Promise<OperationHandler | void> {

        aggregate.changeIpAndSession(<string>command.id, command.newRememberIp, command.newSessionId);

        return;
    }
}
