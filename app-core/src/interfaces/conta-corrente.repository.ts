import { ContaCorrente } from "../models/conta-corrente.model"
import { RepositoryResponse } from "../types/repository.response"

export interface IContaCorrenteRepository {
    inserir(props: {agencia: string, conta: string, idCorrentista: string}): Promise<RepositoryResponse<ContaCorrente>>

    listarTodas(): Promise<RepositoryResponse<Array<ContaCorrente>>>
}
