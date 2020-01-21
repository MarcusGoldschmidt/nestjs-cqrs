export interface HasUpdatedForm<T> {
    csrfToken: string;
    data: T;
}

export interface HasForm {
    csrfToken: string;
}
