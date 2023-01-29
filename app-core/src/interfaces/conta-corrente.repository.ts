import { RepositoryResponse } from "../types/repository.response"

export interface IContaCorrenteRepository {
    inserir(props: {agencia: string, conta: string, idCorrentista: string}): Promise<RepositoryResponse<any>>

    listarTodas(): Promise<RepositoryResponse<Array<any>>>
}