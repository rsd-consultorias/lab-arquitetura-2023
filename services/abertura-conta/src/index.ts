import { IContaCorrenteCommand } from 'rsd-app-core/interfaces/conta-corrente.command';
import { IContaCorrenteQuery } from 'rsd-app-core/interfaces/conta-corrente.query';
import { ICorrentistaCommand } from 'rsd-app-core/interfaces/correntista.command';
import { AberturaContaService } from 'rsd-app-core/services/abertura-conta.service';
import { Sequelize } from "sequelize";
import { AberturaContaController } from "./controller/abertura-contar.controller";
import { ExpressHttpServerAdapter } from "./express.http-server.adapter";
import { ContaCorrenteCommand } from './infra/commands/conta-corrente.command';
import { CorrentistaCommand } from './infra/commands/correntista.command';
import { ContaCorrenteQuery } from './infra/queries/conta-corrente.query';
import { ContaCorrenteRepository } from "./infra/repositories/conta-corrente.repository";
import { CorrentistaRepository } from "./infra/repositories/correntista.repository";
import { PubSub } from "./infra/services/message-broker.service";
import SerasaAdapterService from "./infra/services/serasa.adapter.service";

export function initServer(port: number) {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../../labdb',
        logging: false
    });

    sequelize?.sync();

    // Dependencias
    // TODO: pesquisar algum injetor de dependências
    const correntistaRepository: CorrentistaRepository = new CorrentistaRepository(sequelize);
    const contaCorrenteRepository: ContaCorrenteRepository = new ContaCorrenteRepository(sequelize);
    
    const correntistaCommand: ICorrentistaCommand = new CorrentistaCommand(correntistaRepository);
    const contaCorrenteCommand: IContaCorrenteCommand = new ContaCorrenteCommand(contaCorrenteRepository);
    const contaCorrenteQuery: IContaCorrenteQuery = new ContaCorrenteQuery(contaCorrenteRepository);
    
    const serasaService: SerasaAdapterService = new SerasaAdapterService();
    const correntistaService: AberturaContaService = new AberturaContaService(correntistaCommand, contaCorrenteCommand, contaCorrenteQuery, serasaService);

    // Message broker
    const messageBroker = new PubSub();
    messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()} sub 1 ${JSON.stringify(data)}`); });
    messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()}sub 2 ${JSON.stringify(data)}`); });

    for (let i = 0; i < 5; i++)
        messageBroker.publish('fila-1', { data: `teste fila ${i}` });

    // HttpServer
    const httpServer = new ExpressHttpServerAdapter();

    // Registrar controllers
    new AberturaContaController(httpServer, correntistaService);

    // Listener
    httpServer.listen(port);
}

initServer(Number(process.env.API_PORTA!) || 4201);
