import {IsUUID} from "class-validator";

export abstract class IApplicationCommand {

    protected constructor(id: number | string) {
        this.id = id;
    }

    id: number | string;
}

export class ApplicationEvent {
    @IsUUID()
    public id: number | string;

    constructor(id: number | string) {
        this.id = id;
    }
}
