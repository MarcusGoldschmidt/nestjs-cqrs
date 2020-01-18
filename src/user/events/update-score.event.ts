import {ApplicationEvent} from "../../common/cqrs/abstractions/interfaces";

export class UpdateScoreEvent extends ApplicationEvent {

    constructor(
        id: number,
        private readonly oldScore: number,
        private readonly addScore: number) {
        super(id);
    }
}
