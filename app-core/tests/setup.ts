import { IAnaliseRiscoService } from "../src/interfaces/analise-risco.service";
import { IContaCorrenteCommand } from "../src/interfaces/conta-corrente.command";
import { IContaCorrenteQuery } from "../src/interfaces/conta-corrente.query";
import { ICorrentistaCommand } from "../src/interfaces/correntista.command";
import { ICorrentistaQuery } from "../src/interfaces/correntista.query";
import { ContaCorrente } from "../src/models/conta-corrente.model";
import { Correntista } from "../src/models/correntista.model";
import { AberturaContaService } from "../src/services/abertura-conta.service";
import { AnaliseRiscoRequest, AnaliseRiscoResponse } from "../src/types/analise-riscos.types";
import { CoreResponse } from "../src/types/core.response";

// parâmentros de entrada
export const proponentes = {
    comum: {
        nome: 'Proponente Comum',
        cpf: '12345678901',
        dataNascimento: new Date(1984, 7, 8)
    },
    scoreBaixo: {
        nome: 'Proponente Score Baixo',
        cpf: '12345678902',
        dataNascimento: new Date(1984, 7, 8)
    }
};

// Mock do serviço de análise de score
export class SerasaScoreService implements IAnaliseRiscoService {
    async analisar(request: AnaliseRiscoRequest): Promise<AnaliseRiscoResponse> {
        return {
            cpf: request.cpf,
            dataNascimento: request.dataNascimento,
            nome: 'Fulano de Tal',
            score: request.cpf.endsWith('1') ? 900 : 200
        };
    }
}

// Mock do banco de dados
export var correntistas: Array<Correntista> = []
export function resetCorrentistas() {
    correntistas = []
}

// Mock do repositório
export const correntistaCommand: ICorrentistaCommand = {
    inserir: function (correntista: Correntista): Promise<CoreResponse<Correntista>> {
        return new Promise((resolve, reject) => {
            correntistas.push(correntista);
            resolve({ success: true, data: correntista });
        })
    }
}

export const correntistaQuery: ICorrentistaQuery = {
    listarTodos: function (): Promise<CoreResponse<Correntista[]>> {
        throw new Error("Function not implemented.");
    },

    buscarPorCpf: function (cpf: string): Promise<CoreResponse<Correntista>> {
        return new Promise((resolve, reject) => {
            resolve({
                success: true,
                data: undefined
            });
        });
    }
}

export const contaCorrenteCommand: IContaCorrenteCommand = {
    inserir: function (props: {}): Promise<CoreResponse<ContaCorrente>> {
        return new Promise((resolve, reject) => {
            resolve({ success: true, data: props });
        })
    },
    alterar: function (contaCorrente: ContaCorrente): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Function not implemented.")
    }
}

export const contaCorrenteQuery: IContaCorrenteQuery = {
    listarTodas: function (): Promise<CoreResponse<ContaCorrente[]>> {
        throw new Error("Function not implemented.")
    },
    buscarPorAgenciaEConta: function (agencia: string, conta: string): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Function not implemented.")
    },
    buscarPorCpf: function (cpf: string): Promise<CoreResponse<ContaCorrente>> {
        throw new Error("Function not implemented.")
    }
}

// Instância do serviço
export var correntistaService: AberturaContaService =
    new AberturaContaService(correntistaCommand, correntistaQuery, contaCorrenteCommand, contaCorrenteQuery, new SerasaScoreService())
