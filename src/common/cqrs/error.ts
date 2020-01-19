export interface ApplicationError {
    code: string;
    message: string;
}

const Errors = {
    auth: {},
    user: {},
    generic: {
        notFound: {
            code: 'generic.not.found',
            message: 'Não foi possível acessar o recurso',
        },
    },
};

export default Errors;

export class ErrorsHandler {
    private readonly error: ApplicationError[] = [];

    add(error: ApplicationError) {
        this.error.push(error);
    }

    hasError(): boolean {
        return this.error.length > 0;
    }

    getAll(): Readonly<ApplicationError[]> {
        return this.error;
    }
}
