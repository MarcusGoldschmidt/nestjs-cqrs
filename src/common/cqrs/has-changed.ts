export class HasChanged<T> {

    constructor(
        public readonly oldValue: T,
        public readonly newValue: T,
    ) {
    }
}
