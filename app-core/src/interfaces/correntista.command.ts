import { Correntista } from "../models/correntista.model";
import { CQRSResponse } from "../types/cqrs.response";

export interface ICorrentistaCommand {
    inserir(props: {}): Promise<CQRSResponse<Correntista>>;
}