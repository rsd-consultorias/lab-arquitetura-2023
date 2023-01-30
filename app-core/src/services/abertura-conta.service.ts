import { AnaliseScoreDomain } from "../domain-services/analise-score.domain"
import { gerarMatricula } from "../domain-services/matricula.domain"
import { IAnaliseScoreContract } from "../interfaces/analise-score.service.contract"
import { IContaCorrenteRepository } from "../interfaces/conta-corrente.repository"
import { ICorrentistaRepository } from "../interfaces/correntista.repository"
import { Correntista } from "../models/correntista.model"
import { MENSAGENS_PADRAO } from "../types/constants"
import { makeCorrentistaFromProps } from "../utils/factories"

export class AberturaContaService {
    private _analiseScoreDomain: AnaliseScoreDomain

    constructor(
        private _correntistaRepository: ICorrentistaRepository,
        private _contaCorrenteRepository: IContaCorrenteRepository,
        private _analiseScoreContract: IAnaliseScoreContract) {
        this._analiseScoreDomain = new AnaliseScoreDomain(this._analiseScoreContract)
    }

    async cadastrarCorrentistaAsync(props: {
        nome: string,
        cpf: string,
        dataNascimento: Date
    }): Promise<{
        dados: Correntista, mensagem?: string
    }> {
        let correntista: Correntista = makeCorrentistaFromProps(props)
        correntista.matricula = gerarMatricula(props.cpf)
        correntista.score = this._analiseScoreDomain.analisar(props)

        if (correntista.score <= 200) {
            return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0001 }
        }
        const correntistaCriado = (await this._correntistaRepository.inserirCorrentistaAsync(correntista))
        correntista = correntistaCriado.data!

        if (!correntistaCriado.success) {
            return { dados: correntista, mensagem: correntistaCriado.messagens?.pop() }
        }

        const contaCorrente = await this._contaCorrenteRepository.inserir(
            { agencia: '0001', conta: correntista.matricula!, idCorrentista: correntistaCriado.data?.id! })
        if (!contaCorrente.success) {
            return { dados: correntista, mensagem: contaCorrente.messagens?.pop() }
        }

        return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0002 }
    }
}
