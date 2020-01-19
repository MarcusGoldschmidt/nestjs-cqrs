import {CommandHandler, EventPublisher} from "@nestjs/cqrs";
import UpdateScoreCommand from "./update-score.command";
import {ApplicationHandler, OperationHandler} from "../../common/cqrs/application.handler";
import {UserAggregate} from "../user.aggregate";
import {UserRepository} from "../user.repository";
import CreateUserCommand from "./create-user.command";
import {CreatedUserEvent} from "../events/created-user.event";
import {ErrorsHandler} from "../../common/cqrs/error";

@CommandHandler(UpdateScoreCommand)
export class CreateUserHandler extends ApplicationHandler<UserAggregate, CreateUserCommand> {

    constructor(
        repository: UserRepository,
        publisher: EventPublisher) {
        super(repository, publisher, OperationHandler.INSERT);
    }

    async applicationExecute(aggregate: UserAggregate, command: CreateUserCommand, error: ErrorsHandler): Promise<OperationHandler> {

        // Logic

        // End Logic

        aggregate.publish(new CreatedUserEvent(
            <string>aggregate.getId(),
            aggregate.getEntity().name,
            aggregate.getEntity().email,
            new Date(),
            aggregate.getEntity().rememberIp
        ));

        return OperationHandler.INSERT;
    }
}
