import { IsUUID } from 'class-validator';

export class ApplicationEvent {
    @IsUUID()
    public id: number | string;

    constructor(id: number | string) {
        this.id = id;
    }
}
