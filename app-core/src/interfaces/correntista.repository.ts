import { Correntista } from "../models/correntista.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface ICorrentistaRepository {
    inserirCorrentistaAsync(correntista: Correntista): Promise<CQRSResponse<Correntista>>;
    alterarCorrentistaAsync(correntista: Correntista): Promise<CQRSResponse<Correntista>>;
    excluirCorrentistaById(id: string): Promise<CQRSResponse<Correntista>>;

    buscarTodos(...arg: string[]): Promise<Array<Correntista>>;
    buscarPorCpf(cpf: string): Promise<Correntista>;
}
