import { assert } from "chai"
import { Correntista } from "../src/models/correntista.model"
import { MENSAGENS_PADRAO } from "../src/types/constants"
import { resetCorrentistas, correntistaService, proponentes } from "./setup"

// CENÁRIOS
describe('REQ02 - Análise de Score', () => {
    beforeEach(() => {
        resetCorrentistas()
    })

    it('Verificar score elegível', async () => {
        let correntistaScoreElegivel: { dados: Correntista, mensagem?: string } = await correntistaService.iniciarProcesso(proponentes.comum)
        assert(correntistaScoreElegivel.dados?.score! > 200, 'Score deve ser maior que 200 para esse cenário')
        assert(correntistaScoreElegivel.mensagem == MENSAGENS_PADRAO.CAD0002, `Mensagem de retorno deve ser ${MENSAGENS_PADRAO.CAD0002}`)
    })

    it('Verificar score baixo', async () => {
        let correntistaScoreBaixo: { dados: Correntista, mensagem?: string } = await correntistaService.iniciarProcesso(proponentes.scoreBaixo)
        assert(correntistaScoreBaixo.dados?.score! <= 200, 'Score deve ser menor ou igual 200 para esse cenário')
        assert(correntistaScoreBaixo.mensagem == MENSAGENS_PADRAO.CAD0001, `Mensagem de retorno deve ser ${MENSAGENS_PADRAO.CAD0001}`)
    })
});