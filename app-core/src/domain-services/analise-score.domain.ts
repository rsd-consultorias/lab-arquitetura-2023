import { IAnaliseScoreContract } from "../interfaces/analise-score.service.contract"

export class AnaliseScoreDomain {
    constructor(private analiseScoreContract: IAnaliseScoreContract) {}

    analisar(props: {cpf: string, dataNascimento: Date}) : number {

        return this.analiseScoreContract.analise(props)
    }
}