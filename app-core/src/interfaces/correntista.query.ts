import { Correntista } from "../models/correntista.model";
import { CoreResponse } from "../types/core.response";

export interface ICorrentistaQuery {
    listarTodos(): Promise<CoreResponse<Array<Correntista>>>;
    buscarPorCpf(cpf: string): Promise<CoreResponse<Correntista>>;
}
