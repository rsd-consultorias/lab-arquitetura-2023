import { ContaCorrente } from "../models/conta-corrente.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface IContaCorrenteRepository {
    inserir(props: {agencia: string, conta: string, idCorrentista: string}): Promise<CQRSResponse<ContaCorrente>>;

    listarTodas(): Promise<CQRSResponse<Array<ContaCorrente>>>;
}
