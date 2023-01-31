import { IContaCorrenteQuery } from "rsd-app-core/interfaces/conta-corrente.query";
import { ContaCorrente } from "rsd-app-core/models/conta-corrente.model";
import { CoreResponse } from "rsd-app-core/types/core.response";
import { ContaCorrenteRepository } from "../repositories/conta-corrente.repository";

export class ContaCorrenteQuery implements IContaCorrenteQuery {
    constructor(readonly contaCorrenteRepository: ContaCorrenteRepository) { }

    async listarTodas(): Promise<CoreResponse<ContaCorrente[]>> {
        return await this.contaCorrenteRepository.listarTodas();
    }

    buscarPorAgenciaEConta(agencia: string, conta: string): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Method not implemented.");
    }

    buscarPorCpf(cpf: string): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Method not implemented.");
    }
}
