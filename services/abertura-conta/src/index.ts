import { AberturaContaService } from 'rsd-app-core/services/abertura-conta.service'
import { Sequelize } from "sequelize"
import { AberturaContaController } from "./controller/abertura-contar.controller"
import { ExpressHttpServerAdapter } from "./express.http-server.adapter"
import { ContaCorrenteRepository } from "./infra/repositories/conta-corrente.repository"
import { CorrentistaRepository } from "./infra/repositories/correntista.repository"
import { PubSub } from "./infra/services/message-broker.service"
import SerasaAdapterService from "./infra/services/serasa.adapter.service"

export function initServer(port: number) {
    const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: '../../labdb',
        logging: false
    })

    sequelize?.sync()

    // Dependencias
    let correntistaRepository: CorrentistaRepository = new CorrentistaRepository(sequelize)
    let contaCorrenteRepository: ContaCorrenteRepository = new ContaCorrenteRepository(sequelize)
    let serasaService: SerasaAdapterService = new SerasaAdapterService()
    let correntistaService: AberturaContaService = new AberturaContaService(correntistaRepository, contaCorrenteRepository, serasaService)

    // Message broker
    let messageBroker = new PubSub()
    messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()} sub 1 ${JSON.stringify(data)}`) })
    messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()}sub 2 ${JSON.stringify(data)}`) })

    for (let i = 0; i < 5; i++)
        messageBroker.publish('fila-1', { data: `teste fila ${i}` })

    // HttpServer
    const httpServer = new ExpressHttpServerAdapter()

    // Registrar controllers
    new AberturaContaController(httpServer, correntistaService)

    // Listener
    httpServer.listen(port)
}

initServer(Number(process.env.API_PORTA!) || 4201)