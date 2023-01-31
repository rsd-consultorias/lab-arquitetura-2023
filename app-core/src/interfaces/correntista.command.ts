import { Correntista } from "../models/correntista.model";
import { CoreResponse } from "../types/core.response";

export interface ICorrentistaCommand {
    inserir(correntista: Correntista): Promise<CoreResponse<Correntista>>;
}