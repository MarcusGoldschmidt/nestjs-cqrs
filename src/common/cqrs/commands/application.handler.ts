import {EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {IApplicationCommand} from "../abstractions/interfaces";
import {ApplicationAggregate} from "../abstractions/aggregate.abstraction";
import {ApplicationRepository} from "../database/application.repository";
import {ApplicationEntity} from "../abstractions/entity.abstraction";

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
        private readonly publisher: EventPublisher) {
    }

    async execute(command: V) {

        const aggregateNoEvent = await this.repository.findById(command.id);
        const aggregate = this.publisher.mergeObjectContext(aggregateNoEvent);

        // @ts-ignore
        const operator = await this.applicationExecute(aggregate, command);

        if (operator === OperationHandler.SKIP){
            return ;
        }

        // Persist in database
        if (operator == OperationHandler.DELETE) {
            await this.repository.remove(aggregate.getEntity());
        } else {
            await this.repository.commit(aggregate.getEntity());
        }

        // emit events
        await aggregate.commit();
    }

    // All application logic here
    // Domain logic in aggregate
    abstract async applicationExecute(aggregate: T, command: V): Promise<OperationHandler>;
}
