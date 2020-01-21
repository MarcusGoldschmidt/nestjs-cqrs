import {ApplicationError} from '../cqrs/error';

export class ApplicationErrorsException extends Error {
    constructor(
        public readonly errors: Readonly<ApplicationError[]>,
    ) {
        super();
    }
}
