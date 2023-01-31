import { Correntista } from "../models/correntista.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface ICorrentistaQuery {
    listarTodos(): Promise<CQRSResponse<Array<Correntista>>>;
    buscarPorCpf(cpf: string): Promise<CQRSResponse<Correntista>>;
}