import {Repository} from "typeorm";
import {ApplicationAggregate} from "../abstractions/aggregate.abstraction";

export abstract class AplicationRepository<T> {
    protected constructor(
        private readonly repository: Repository<T>) {
    }

    abstract findById(id: number): Promise<ApplicationAggregate>
}
