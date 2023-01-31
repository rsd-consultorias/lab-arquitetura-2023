import { IAnaliseScoreContract } from "../src/interfaces/analise-score.service.contract"
import { IContaCorrenteRepository } from "../src/interfaces/conta-corrente.repository"
import { ICorrentistaCommand } from "../src/interfaces/correntista.command"
import { Correntista } from "../src/models/correntista.model"
import { AberturaContaService } from "../src/services/abertura-conta.service"
import { CoreResponse } from "../src/types/core.response"

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
}

// Mock do serviço de análise de score
export class SerasaScoreService implements IAnaliseScoreContract {
    callAnaliseService(cpf: string, dataNascimento: Date, accessKey: string): any {
        if (cpf === '12345678901') {
            return { points: 900, cpf: cpf, dataNascimento: dataNascimento, consultaAt: new Date() }
        } else if (cpf === '12345678902') {
            return { points: 200, cpf: cpf, dataNascimento: dataNascimento, consultaAt: new Date() }
        }
    }

    analise(props: { cpf: string, dataNascimento: Date }): number {
        let result = this.callAnaliseService(props.cpf, props.dataNascimento, 'tdjigyfdgyfd9g7dfgfd97gdf967g')

        return result.points
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

export const contaCorrenteRepository: IContaCorrenteRepository = {
    inserir: function (props: { agencia: string, conta: string, idCorrentista: string }): Promise<CoreResponse<any>> {
        return new Promise((resolve, reject) => {
            resolve({success: true, data: props});
        })
    },
    listarTodas: function (): Promise<CoreResponse<any[]>> {
        throw new Error("Function not implemented.");
    }
}

// Instância do serviço
export var correntistaService: AberturaContaService = new AberturaContaService(correntistaCommand, contaCorrenteRepository, new SerasaScoreService())
