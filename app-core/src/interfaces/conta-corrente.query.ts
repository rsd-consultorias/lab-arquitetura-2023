import { ContaCorrente } from "../models/conta-corrente.model";
import { CoreResponse } from "../types/core.response";

export interface IContaCorrenteQuery {
    listarTodas(): Promise<Array<ContaCorrente>>;
    buscarPorAgenciaEConta(agencia: string, conta: string): Promise<CoreResponse<ContaCorrente>>;
    buscarPorCpf(cpf: string): Promise<CoreResponse<ContaCorrente>>;
}
