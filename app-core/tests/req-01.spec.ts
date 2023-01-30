import { assert } from "chai"
import { Correntista } from "../src/models/correntista.model"
import { MENSAGENS_PADRAO } from "../src/types/constants"
import { resetCorrentistas, correntistaService, proponentes } from "./setup.spec"

// CENÁRIOS
describe('REQ-01 - Criação de Conta', () => {
    beforeEach(() => {
        resetCorrentistas()
    })

    it('Deve criar um correntista', async () => {
        let correntistaComum: { dados: Correntista, mensagem?: string } = await correntistaService.cadastrarCorrentistaAsync(proponentes.comum)
        assert(correntistaComum.mensagem == MENSAGENS_PADRAO.CAD0002, `Mensagem de retorno deve ser ${MENSAGENS_PADRAO.CAD0002}`)
    })

    it('Verificar se a matrícula foi criada com 6 caracteres', async () => {
        let correntistaComum: { dados: Correntista, mensagem?: string } = await correntistaService.cadastrarCorrentistaAsync(proponentes.comum)
        assert(correntistaComum.dados.matricula?.length == 6, 'Matrícula deve ter 6 caracteres')
    })
})
