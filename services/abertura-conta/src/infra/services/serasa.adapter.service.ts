import { IAnaliseScoreContract } from "rsd-app-core/interfaces/analise-score.service.contract"

export default class SerasaAdapterService implements IAnaliseScoreContract {
    callAnaliseService(cpf: string, dataNascimento: Date, accessKey: string): any {
        if (cpf.endsWith('1')) {
            return { points: 900, cpf: cpf, dataNascimento: dataNascimento, consultaAt: new Date() }
        } else if (cpf.endsWith('2')) {
            return { points: 200, cpf: cpf, dataNascimento: dataNascimento, consultaAt: new Date() }
        } else {
            return { points: 0 }
        }
    }

    analise(props: { cpf: string, dataNascimento: Date }): number {
        let result = this.callAnaliseService(props.cpf, props.dataNascimento, 'tdjigyfdgyfd9g7dfgfd97gdf967g')

        return result.points
    }
}