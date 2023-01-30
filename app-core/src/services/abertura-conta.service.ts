import { AnaliseScoreDomain } from "../domain-services/analise-score.domain"
import { gerarMatricula } from "../domain-services/matricula.domain"
import { IAnaliseScoreContract } from "../interfaces/analise-score.service.contract"
import { IContaCorrenteRepository } from "../interfaces/conta-corrente.repository"
import { ICorrentistaRepository } from "../interfaces/correntista.repository"
import { Correntista } from "../models/correntista.model"
import { MENSAGENS_PADRAO } from "../types/constants"

export class AberturaContaService {
    private _analiseScoreDomain: AnaliseScoreDomain

    constructor(
        private correntistaRepository: ICorrentistaRepository,
        private contaCorrenteRepository: IContaCorrenteRepository,
        private analiseScoreContract: IAnaliseScoreContract) {
        this._analiseScoreDomain = new AnaliseScoreDomain(this.analiseScoreContract)
    }

    async cadastrarCorrentistaAsync(props: { nome: string, cpf: string, dataNascimento: Date }): Promise<{ dados: Correntista, mensagem?: string }> {
        let correntista: Correntista = new Correntista()
        correntista.cpf = props.cpf
        correntista.nome = props.nome
        correntista.dataNascimento = props.dataNascimento
        correntista.matricula = gerarMatricula(props.cpf)
        correntista.score = this._analiseScoreDomain.analisar(props)

        if (correntista.score <= 200) {
            return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0001 }
        }
        let correntistaCriado = (await this.correntistaRepository.inserirCorrentistaAsync(correntista))
        correntista = correntistaCriado.data!

        if(!correntistaCriado.success) {
            return {dados: correntista, mensagem: correntistaCriado.messagens?.pop()}
        }

        let contaCorrente = await this.contaCorrenteRepository.inserir({agencia: '0001', conta: correntista.matricula!, idCorrentista: correntistaCriado.data?.id!})
        console.log(contaCorrente)
        if(!contaCorrente.success) {
            return { dados: correntista, mensagem: contaCorrente.messagens?.pop() }
        }

        return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0002 }
    }
}