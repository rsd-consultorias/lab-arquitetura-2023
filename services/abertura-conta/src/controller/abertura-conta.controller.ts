import { ParamsDictionary } from "express-serve-static-core";
import { IContaCorrenteQuery } from "rsd-app-core/interfaces/conta-corrente.query";
import { ICorrentistaQuery } from "rsd-app-core/interfaces/correntista.query";
import { AberturaContaService } from "rsd-app-core/services/abertura-conta.service";
import { IHttpServer } from "src/http-server.interface";

export class AberturaContaController {

    URL_API = '/api/v1/abertura-conta';

    constructor(
        readonly httpServer: IHttpServer,
        readonly aberturaContaService: AberturaContaService,
        readonly contaCorrenteQuery: IContaCorrenteQuery,
        readonly correntistaQuery: ICorrentistaQuery) {

        this.httpServer.register(this.URL_API, 'post', async (params: ParamsDictionary, body: any) => {
            try {
                return await this.aberturaContaService.iniciarProcesso(body);
            } catch (error) {
                return { success: false, mensagem: 'ERRO DE SISTEMA' };
            }
        });

        this.httpServer.register(this.URL_API, 'get', async (params: ParamsDictionary, body: any): Promise<any> => {
            try {
                return { correntistas: await this.correntistaQuery.listarTodos(), contasCorrentes: await this.contaCorrenteQuery.listarTodas() };
            } catch (error) {
                return { success: false, mensagem: 'ERRO DE SISTEMA' };
            }
        });
    }
}
