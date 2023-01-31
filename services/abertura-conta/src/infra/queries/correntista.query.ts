import { ICorrentistaQuery } from 'rsd-app-core/interfaces/correntista.query';
import { Correntista } from 'rsd-app-core/models/correntista.model';
import { CoreResponse } from 'rsd-app-core/types/core.response';
import { CorrentistaRepository } from '../repositories/correntista.repository';

export class CorrentistaQuery implements ICorrentistaQuery {
    constructor(readonly correntistaRepository: CorrentistaRepository) { }

    async listarTodos(): Promise<CoreResponse<Correntista[]>> {
        let found = await this.correntistaRepository.buscarTodos();
        return { success: true, data: found };
    }

    async buscarPorCpf(cpf: string): Promise<CoreResponse<Correntista>> {
        return { success: true, data: await this.correntistaRepository.buscarPorCpf(cpf) };
    }

}