import {ApplicationAggregate} from '../common/cqrs/aggregate.abstraction';
import {UserEntity} from './user.entity';
import {UpdatedScoreEvent} from './events/updated-score.event';
import {HasChanged} from '../common/cqrs/has-changed';
import {UpdatedSessionEvent} from './events/updated-session.event';

export class UserAggregate extends ApplicationAggregate<UserEntity> {

    constructor(entity: UserEntity) {
        super(entity);
    }

    updateScore(add: number) {
        const oldScore = this.entity.score;

        this.entity.score += add;

        // Emit event
        this.apply(new UpdatedScoreEvent( this.getId() as string, oldScore, add));
    }

    changeIpAndSession(userId: string, newIp: string, newSessionId: string): void {
        if (this.getId() === userId) {

        }

        const auditIp = new HasChanged<string>(this.entity.rememberIp, newIp);
        const auditSession = new HasChanged<string>(this.entity.rememberToken, newSessionId);

        this.entity.rememberIp = newIp;
        this.entity.rememberToken = newSessionId;

        // Emit event
        this.apply(new UpdatedSessionEvent( this.getId() as string, auditIp, auditSession));
    }

}
