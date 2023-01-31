import { ParamsDictionary } from "express-serve-static-core";
import { IContaCorrenteQuery } from "rsd-app-core/interfaces/conta-corrente.query";
import { AberturaContaService } from "rsd-app-core/services/abertura-conta.service";
import { IHttpServer } from "src/http-server.interface";

export class AberturaContaController {

    URL_API = '/api/v1/abertura-conta';

    constructor(readonly httpServer: IHttpServer, readonly aberturaContaService: AberturaContaService, readonly contaCorrenteQuery: IContaCorrenteQuery) {
        this.httpServer.register(this.URL_API, 'post', async (params: ParamsDictionary, body: any) => {
            try {
                return await this.aberturaContaService.gravarDadosFormularioAbertura(body);
            } catch (error) {
                return { success: false, mensagem: 'ERRO DE SISTEMA' };
            }
        });

        this.httpServer.register(this.URL_API, 'get', async (params: ParamsDictionary, body: any): Promise<import("/Users/rafaeldias/Repositories/node/lab-arquitetura-2023/app-core/dist/src/types/repository.response").RepositoryResponse<import("/Users/rafaeldias/Repositories/node/lab-arquitetura-2023/app-core/dist/src/models/conta-corrente.model").ContaCorrente[]> | { success: boolean; mensagem: string }> => {
            try {
                return await this.contaCorrenteQuery.listarTodas();
            } catch (error) {
                return { success: false, mensagem: 'ERRO DE SISTEMA' };
            }
        });
    }
}
