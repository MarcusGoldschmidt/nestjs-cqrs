import {AggregateRoot} from "@nestjs/cqrs";
import {AplicationEntity} from "./entity.abstraction";

// Class to
export abstract class ApplicationAggregate<T extends AplicationEntity> extends AggregateRoot {
    protected constructor(private readonly entity: T) {
        super();
    }

    getId(): number {
        return this.entity.id;
    }
}
