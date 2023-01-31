import { ContaCorrente } from "../models/conta-corrente.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface IContaCorrenteQuery {
    listarTodas(): Promise<Array<ContaCorrente>>;
    buscarPorAgenciaEConta(agencia: string, conta: string): Promise<CQRSResponse<ContaCorrente>>;
    buscarPorCpf(cpf: string): Promise<CQRSResponse<ContaCorrente>>;
}