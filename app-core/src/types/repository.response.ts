export class RepositoryResponse<T> {

    constructor(
        public success?: boolean,
        public data?: T,
        public messagens?: Array<string>) {

        this.messagens = [];
    }
}
