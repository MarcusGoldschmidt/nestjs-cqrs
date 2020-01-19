import {EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {IApplicationCommand} from "./interfaces";
import {ApplicationAggregate} from "./aggregate.abstraction";
import {ApplicationRepository} from "./application.repository";
import {ApplicationEntity} from "./entity.abstraction";
import {NotFoundException} from "@nestjs/common";

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
        private readonly publisher: EventPublisher,
        protected readonly operationIntent: OperationHandler,) {
    }

    async execute(command: V) {

        const aggregateNoEvent = await this.repository.findById(command.id);
        const aggregate = this.publisher.mergeObjectContext(aggregateNoEvent);

        if (this.operationIntent !== OperationHandler.INSERT && aggregate.getEntity() == undefined) {
            throw new NotFoundException()
        }

        // @ts-ignore
        this.operationIntent = await this.applicationExecute(aggregate, command) || this.operationIntent;

        if (this.operationIntent === OperationHandler.SKIP) {
            return;
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

    // All application logic here
    // Domain logic in aggregate
    abstract async applicationExecute(aggregate: T, command: V): Promise<OperationHandler | void>;
}
