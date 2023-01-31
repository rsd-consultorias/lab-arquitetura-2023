import { ICorrentistaCommand } from "rsd-app-core/interfaces/correntista.command";
import { Correntista } from "rsd-app-core/models/correntista.model";
import { CoreResponse } from "rsd-app-core/types/core.response";
import { CorrentistaRepository } from "../repositories/correntista.repository";

export class CorrentistaCommand implements ICorrentistaCommand {
    constructor(readonly correntistaRepository: CorrentistaRepository) { }

    async inserir(correntista: Correntista): Promise<CoreResponse<Correntista>> {
        return await this.correntistaRepository.inserirCorrentistaAsync(correntista);
    }

}
