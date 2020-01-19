import {ApplicationEvent} from "../../common/cqrs/interfaces";

export class UpdatedScoreEvent extends ApplicationEvent {

    constructor(
        id: string,
        private readonly oldScore: number,
        private readonly addScore: number) {
        super(id);
    }
}
