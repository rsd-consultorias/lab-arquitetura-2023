import { IAnaliseScoreContract } from "../interfaces/analise-score.service.contract"

export class AnaliseScoreDomain {
    constructor(readonly analiseScoreContract: IAnaliseScoreContract) {}

    analisar(props: {cpf: string, dataNascimento: Date}) : number {

        return this.analiseScoreContract.analise(props)
    }
}
