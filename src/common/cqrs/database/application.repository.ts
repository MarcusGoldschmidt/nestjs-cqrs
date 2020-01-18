import {Repository} from "typeorm";
import {ApplicationAggregate} from "../abstractions/aggregate.abstraction";
import {ApplicationEntity} from "../abstractions/entity.abstraction";

export abstract class ApplicationRepository<T extends ApplicationAggregate<ApplicationEntity>> {
    protected constructor(
        protected readonly repository: Repository<ApplicationEntity>) {
    }

    abstract findById(id: string | number): Promise<T>

    async commit(entity: ApplicationEntity) {
        return await this.repository.save(entity);
    }

    async remove(entity: ApplicationEntity) {
        return await this.repository.remove(entity);
    }
}
