import cors from "cors"
import express, { Request, Response } from "express"
import { AberturaContaService } from 'rsd-app-core/services/abertura-conta.service'
import { Sequelize } from "sequelize"
import { ContaCorrenteRepository } from "./infra/repositories/conta-corrente.repository"
import { CorrentistaRepository } from "./infra/repositories/correntista.repository"
import SerasaService from "./infra/services/serasa.service"

export const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: '../../labdb'
})
sequelize?.sync()

let correntistaRepository: CorrentistaRepository = new CorrentistaRepository(sequelize)
let contaCorrenteRepository: ContaCorrenteRepository = new ContaCorrenteRepository(sequelize)
let serasaService: SerasaService = new SerasaService()
let correntistaService: AberturaContaService = new AberturaContaService(correntistaRepository, contaCorrenteRepository, serasaService)

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
    res.json(
        await correntistaService.cadastrarCorrentistaAsync(req.body)
    )
})

app.get(`/api/${API_VERSAO}/`, async (req: Request, res: Response) => {
    res.json({
        correntistas: await correntistaRepository.buscarTodos({}),
        contas: await contaCorrenteRepository.listarTodas()
    })
})

app.get(`/api/${API_VERSAO}/:cpf`, async (req: Request, res: Response) => {
    res.json(await correntistaService.cadastrarCorrentistaAsync({
        nome: 'Fulano de Tal',
        cpf: req.params.cpf,
        dataNascimento: new Date(1984, 7, 8)
    }))
})

// Listener
app.listen(API_PORTA, async () => {

    console.log(`${new Date().toISOString()} Escutando porta ${API_PORTA}`)
    console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV || 'development'}`)
})