import { IHttpServer } from "./http-server.interface";
import cors from "cors"
import express, { Request, Response } from "express"

export class ExpressHttpServerAdapter implements IHttpServer {
    app: any

    constructor() {
        const corsOptions = {
            origin: [
                'http://localhost:4200',
            ]
        }

        this.app = express()
        this.app.use(cors(corsOptions))
        this.app.use(express.json({ limit: '1mb' }))
        this.app.use(express.urlencoded({ limit: '1mb', extended: true }))
        this.app.set('trust proxy', true)
    }

    async register(url: string, method: string, callback: Function): Promise<void> {
        this.app[method](url, async function (req: Request, res: Response) {
            res.json(await callback(req.params, req.body))
        })
    }

    listen(port: number): void {
        console.log(`${new Date().toISOString()} Escutando porta ${port}`)
        console.log(`${new Date().toISOString()} Ambiente ${process.env.NODE_ENV || 'development'}`)
        this.app.listen(port)
    }

}