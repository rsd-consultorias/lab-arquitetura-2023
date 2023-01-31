import { IContaCorrenteCommand } from "rsd-app-core/interfaces/conta-corrente.command";
import { ContaCorrente } from "rsd-app-core/models/conta-corrente.model";
import { CoreResponse } from "rsd-app-core/types/core.response";
import { ContaCorrenteRepository } from "../repositories/conta-corrente.repository";

export class ContaCorrenteCommand implements IContaCorrenteCommand {

    constructor(readonly contaCorrenteRepository: ContaCorrenteRepository) { }

    async inserir(props: {
        agencia: string,
        conta: string,
        idCorrentista: string
    }): Promise<CoreResponse<ContaCorrente>> {
        return await this.contaCorrenteRepository.inserir(props);
    }

    alterar(contaCorrente: ContaCorrente): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Method not implemented.");
    }
}
