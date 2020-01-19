import {EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {IApplicationCommand} from "./interfaces";
import {ApplicationAggregate} from "./aggregate.abstraction";
import {ApplicationRepository} from "./application.repository";
import {ApplicationEntity} from "./entity.abstraction";
import {NotFoundException} from "@nestjs/common";
import Errors, {ErrorsHandler} from "./error";
import {ApplicationErrorsException} from "../exceptions/application-errors.exception";

export enum OperationHandler {
    UPDATE,
    INSERT,
    DELETE,
    SKIP
}

// T is the aggregate
// V que command
export abstract class ApplicationHandler<T extends ApplicationAggregate<ApplicationEntity>,
    V extends IApplicationCommand>
    implements ICommandHandler<V> {

    protected constructor(
        private readonly repository: ApplicationRepository<T>,
        protected readonly publisher: EventPublisher,
        private readonly operationIntent: OperationHandler,) {
    }

    async execute(command: V) {
        const errorsHandler = new ErrorsHandler();

        const aggregateNoEvent = await this.repository.findById(command.id);
        const aggregate = this.publisher.mergeObjectContext(aggregateNoEvent);

        if (this.operationIntent !== OperationHandler.INSERT && aggregate.getEntity() == undefined) {
            errorsHandler.add(Errors.generic.notFound);
            throw new ApplicationErrorsException(errorsHandler.getAll());
        }

        // @ts-ignore
        this.operationIntent = await this.applicationExecute(aggregate, command, errorsHandler) || this.operationIntent;

        if (this.operationIntent === OperationHandler.SKIP) {
            return;
        }

        if (errorsHandler.hasError()) {
            throw new ApplicationErrorsException(errorsHandler.getAll());
        }

        // Persist in database
        if (this.operationIntent == OperationHandler.DELETE) {
            await this.repository.remove(aggregate.getEntity());
        } else {
            await this.repository.commit(aggregate.getEntity());
        }

        // emit events
        await aggregate.commit();
    }

    // TODO: where validate props?
    // Before command handler or both?
    // in the command handler just validate One property at a time with exceptions
    // All application logic here
    // Domain logic in aggregate
    abstract async applicationExecute(aggregate: T, command: V, error: ErrorsHandler): Promise<OperationHandler | void>;
}
