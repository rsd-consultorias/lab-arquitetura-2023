import cors from "cors"
import express, { Request, Response } from "express"
import { AberturaContaService } from 'rsd-app-core/services/abertura-conta.service'
import { Sequelize } from "sequelize"
import { ContaCorrenteRepository } from "./infra/repositories/conta-corrente.repository"
import { CorrentistaRepository } from "./infra/repositories/correntista.repository"
import { MessageBroker, MyMessageBroker, PubSub } from "./infra/services/message-broker.service"
import SerasaService from "./infra/services/serasa.service"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../labdb',
    logging: false
})
sequelize?.sync()

let correntistaRepository: CorrentistaRepository = new CorrentistaRepository(sequelize)
let contaCorrenteRepository: ContaCorrenteRepository = new ContaCorrenteRepository(sequelize)
let serasaService: SerasaService = new SerasaService()
let correntistaService: AberturaContaService = new AberturaContaService(correntistaRepository, contaCorrenteRepository, serasaService)

// Message broker
let messageBroker = new PubSub()
messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()} sub 1 ${JSON.stringify(data)}`) })
messageBroker.subscribe('fila-1', (data) => { console.log(`${new Date().toUTCString()}sub 2 ${JSON.stringify(data)}`) })

for (let i = 0; i < 100; i++)
    messageBroker.publish('fila-1', { data: `teste fila ${i}` })



// Express
const API_PORTA = process.env.API_PORTA! || 4201
const API_VERSAO = 'v1'

const corsOptions = {
    origin: [
        'http://localhost:4200',
    ]
}

const app = express()
app.use(cors(corsOptions))
app.use(express.json({ limit: '1mb' }))
app.use(express.urlencoded({ limit: '1mb', extended: true }))
app.set('trust proxy', true)

app.post(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    try {
        res.json(
            await correntistaService.cadastrarCorrentistaAsync(req.body)
        )
    } catch (error) {
        res.json({ success: false, mensagem: 'ERRO DE SISTEMA' })
    }
})

app.get(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    res.json({
        correntistas: await correntistaRepository.buscarTodos({}),
        contas: await contaCorrenteRepository.listarTodas()
    })
})

// Listener
app.listen(API_PORTA, async () => {

    console.log(`${new Date().toISOString()} Escutando porta ${API_PORTA}`)
    console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV || 'development'}`)
})