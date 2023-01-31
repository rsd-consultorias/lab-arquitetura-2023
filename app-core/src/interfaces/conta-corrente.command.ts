import { ContaCorrente } from "../models/conta-corrente.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface IContaCorrenteCommand {
    inserir(props: {}): Promise<CQRSResponse<ContaCorrente>>;
    alterar(contaCorrente: ContaCorrente): Promise<CQRSResponse<ContaCorrente>>;
}