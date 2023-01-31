import { AnaliseScoreDomain } from "../domain-services/analise-score.domain";
import { gerarMatricula } from "../domain-services/matricula.domain";
import { IAnaliseScoreContract } from "../interfaces/analise-score.service.contract";
import { IContaCorrenteCommand } from "../interfaces/conta-corrente.command";
import { IContaCorrenteQuery } from "../interfaces/conta-corrente.query";
import { ICorrentistaCommand } from "../interfaces/correntista.command";
import { ContaCorrente } from "../models/conta-corrente.model";
import { Correntista } from "../models/correntista.model";
import { MENSAGENS_PADRAO } from "../types/constants";
import { CoreResponse } from "../types/core.response";
import { makeCorrentistaFromProps } from "../utils/factories";

export class AberturaContaService {
    private _analiseScoreDomain: AnaliseScoreDomain;

    constructor(
        readonly correntistaCommand: ICorrentistaCommand,
        readonly contaCorrenteCommand: IContaCorrenteCommand,
        readonly contaCorrenteQuery: IContaCorrenteQuery,
        readonly analiseScoreContract: IAnaliseScoreContract) {
        this._analiseScoreDomain = new AnaliseScoreDomain(this.analiseScoreContract);
    }

    async gravarDadosFormularioAbertura(props: {
        nome: string,
        cpf: string,
        dataNascimento: Date
    }): Promise<{ dados: Correntista, mensagem?: string }> {
        let correntista: Correntista = makeCorrentistaFromProps(props);
        correntista.matricula = gerarMatricula(props.cpf);
        correntista.score = this._analiseScoreDomain.analisar(props);

        if (correntista.score <= 200) {
            return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0001 };
        }
        const correntistaCriado = (await this.correntistaCommand.inserir(correntista));
        correntista = correntistaCriado.data!;

        if (!correntistaCriado.success) {
            return { dados: correntista, mensagem: correntistaCriado.messagens?.pop() };
        }

        const contaCorrente = await this.contaCorrenteCommand.inserir(
            { agencia: '0001', conta: correntista.matricula!, idCorrentista: correntistaCriado.data?.id! });
        if (!contaCorrente.success) {
            return { dados: correntista, mensagem: contaCorrente.messagens?.pop() };
        }

        return { dados: correntista, mensagem: MENSAGENS_PADRAO.CAD0002 };
    }

    async enviarParaAnaliseDeCredito(props: {}): Promise<CoreResponse<undefined>> {
        return { success: true, data: undefined };
    }

    async listarContas(): Promise<CoreResponse<ContaCorrente[]>> {
        return await this.contaCorrenteQuery.listarTodas();
    }
}
