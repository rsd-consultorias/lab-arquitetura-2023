import { IAnaliseRiscoService } from "../interfaces/analise-risco.service";
import { IContaCorrenteCommand } from "../interfaces/conta-corrente.command";
import { IContaCorrenteQuery } from "../interfaces/conta-corrente.query";
import { ICorrentistaCommand } from "../interfaces/correntista.command";
import { ICorrentistaQuery } from "../interfaces/correntista.query";
import { Correntista } from "../models/correntista.model";
import { MENSAGENS_PADRAO } from "../types/constants";
import { CoreResponse } from "../types/core.response";
import { makeCorrentistaFromProps } from "../utils/factories";

export class AberturaContaService {

    constructor(
        readonly correntistaCommand: ICorrentistaCommand,
        readonly correntistaQuery: ICorrentistaQuery,
        readonly contaCorrenteCommand: IContaCorrenteCommand,
        readonly contaCorrenteQuery: IContaCorrenteQuery,
        readonly analiseRiscoService: IAnaliseRiscoService) { }

    async gravarDadosFormularioAbertura(props: {
        nome: string,
        cpf: string,
        dataNascimento: Date
    }): Promise<{ dados: Correntista, mensagem?: string }> {
        let correntista: Correntista = makeCorrentistaFromProps(props);

        // Verificar se correntista já existe
        let correntisaExistente = await this.correntistaQuery.buscarPorCpf(correntista.cpf!);

        if (correntisaExistente.data) {
            return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0004 };
        }

        correntista.score = (await this.analiseRiscoService.analisar({
            cpf: correntista.cpf!,
            dataNascimento: correntista.dataNascimento!
        })).score;

        if (correntista.score <= 200) {
            return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0001 };
        }
        const correntistaCriado = (await this.correntistaCommand.inserir(correntista));
        correntista = correntistaCriado.data!;

        if (!correntistaCriado.success) {
            return { dados: correntista, mensagem: correntistaCriado.messagens?.pop() };
        }

        const contaCorrente = await this.contaCorrenteCommand.inserir(
            { agencia: '0001', conta: correntistaCriado.data?.cpf!.substring(5), idCorrentista: correntistaCriado.data?.id! });
        if (!contaCorrente.success) {
            return { dados: correntista, mensagem: contaCorrente.messagens?.pop() };
        }

        return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0002 };
    }

    async enviarParaAnaliseDeCredito(props: {}): Promise<CoreResponse<undefined>> {
        return { success: true, data: undefined };
    }

    async processarRetornoAnaliseCredito(props: {}): Promise<CoreResponse<undefined>> {
        return { success: true, data: undefined };
    }
}
