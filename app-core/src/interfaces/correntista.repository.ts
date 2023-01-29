import { Correntista } from "../models/correntista.model"
import { RepositoryResponse } from "../types/repository.response"

export interface ICorrentistaRepository {
    inserirCorrentistaAsync(correntista: Correntista): Promise<RepositoryResponse<Correntista>>
    alterarCorrentistaAsync(correntista: Correntista): Promise<RepositoryResponse<Correntista>>
    excluirCorrentistaById(id: string): Promise<RepositoryResponse<Correntista>>

    buscarTodos(...arg: any[]): Promise<Array<Correntista>>
    buscarPorCpf(cpf: string): Promise<Correntista>
}