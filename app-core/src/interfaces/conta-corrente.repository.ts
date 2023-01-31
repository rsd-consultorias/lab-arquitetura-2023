import { ContaCorrente } from "../models/conta-corrente.model";
import { CoreResponse } from "../types/core.response";

export interface IContaCorrenteRepository {
    inserir(props: {agencia: string, conta: string, idCorrentista: string}): Promise<CoreResponse<ContaCorrente>>;

    listarTodas(): Promise<CoreResponse<Array<ContaCorrente>>>;
}
