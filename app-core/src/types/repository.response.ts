export class RepositoryResponse<T> {
    success?: boolean
    data?: T
    messagens?: Array<string> = []
}