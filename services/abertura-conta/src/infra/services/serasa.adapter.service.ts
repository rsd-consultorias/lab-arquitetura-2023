import { credentials, loadPackageDefinition } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { IAnaliseRiscoService } from "rsd-app-core/interfaces/analise-risco.service";
import { AnaliseRiscoRequest, AnaliseRiscoResponse } from "rsd-app-core/types/analise-riscos.types";

export default class SerasaAdapterService implements IAnaliseRiscoService {
    client: any;

    constructor() {
        const packageDefinition = loadSync(
            `${__dirname}/../../../../.proto/analise-risco.proto`,
            {
                keepCase: true,
                longs: String,
                enums: String,
                defaults: true,
                oneofs: true
            });

        const protoDescriptor = loadPackageDefinition(packageDefinition).rsdanaliserisco;
        // @ts-ignore
        this.client = new protoDescriptor.AnaliseRisco('localhost:50051',
            credentials.createInsecure(), {
            'grpc.keepalive_time_ms': 15000
        });
    }

    async analisar(request: AnaliseRiscoRequest): Promise<AnaliseRiscoResponse> {
        return new Promise((resolve, reject) => {
            this.client.analisar({
                cpf: request.cpf,
                dataNascimento: request.dataNascimento
            }, (err: any, response: any) => {
                if (err)
                    resolve({cpf: request.cpf, dataNascimento: request.dataNascimento, nome: '', score: 0});
                resolve(response);
            });
        })
    }
}
