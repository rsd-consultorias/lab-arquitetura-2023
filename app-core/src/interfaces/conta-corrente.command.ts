import { ContaCorrente } from "../models/conta-corrente.model";
import { CoreResponse } from "../types/core.response";

export interface IContaCorrenteCommand {
    inserir(props: {}): Promise<CoreResponse<ContaCorrente>>;
    alterar(contaCorrente: ContaCorrente): Promise<CoreResponse<ContaCorrente>>;
    listarTodas(): Promise<CoreResponse<Array<ContaCorrente>>>;
}