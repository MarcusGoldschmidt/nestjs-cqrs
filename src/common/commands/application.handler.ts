import {EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {IAplicationCommand} from "../abstractions/interfaces";
import {ApplicationAggregate} from "../abstractions/aggregate.abstraction";
import {AplicationRepository} from "../database/aplication.repository";
import {AplicationEntity} from "../abstractions/entity.abstraction";

// T is the aggregate
// V que command
export abstract class ApplicationHandler<T extends ApplicationAggregate<AplicationEntity>, V extends IAplicationCommand> implements ICommandHandler<V> {
    protected constructor(
        private readonly repository: AplicationRepository<T>,
        private readonly publisher: EventPublisher) {
    }

    async execute(command: V) {
        const aggregate = this.publisher.mergeObjectContext(
            await this.repository.findById(command.id)
        );

        await this.applicationExecute(aggregate, command);

        await aggregate.commit();
    }

    abstract async applicationExecute(aggregate: T, command: V);
}
