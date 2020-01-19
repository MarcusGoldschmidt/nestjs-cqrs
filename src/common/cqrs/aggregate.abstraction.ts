import {AggregateRoot} from "@nestjs/cqrs";
import {ApplicationEntity} from "./entity.abstraction";

// Class to
export abstract class ApplicationAggregate<T extends ApplicationEntity> extends AggregateRoot {
    protected constructor(protected readonly entity: T) {
        super();
    }

    getId(): number | string {
        return this.entity.id;
    }

    getEntity(): Readonly<ApplicationEntity> {
        return this.entity;
    }
}
