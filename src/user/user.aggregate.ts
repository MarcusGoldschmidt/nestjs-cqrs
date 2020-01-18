import {ApplicationAggregate} from "../common/cqrs/abstractions/aggregate.abstraction";
import {UserEntity} from "./user.entity";
import {UpdateScoreEvent} from "./events/update-score.event";

export class UserAggregate extends ApplicationAggregate<UserEntity> {

    constructor(entity: UserEntity) {
        super(entity);
    }

    updateScore(add: number) {
        let oldScore = this.entity.score;

        this.entity.score += add;

        // Emit event
        this.apply(new UpdateScoreEvent(this.getId(), oldScore, add));
    }

}
