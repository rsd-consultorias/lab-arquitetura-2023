import { credentials, loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';

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

function main() {
    // @ts-ignore
    const client = new protoDescriptor.AnaliseRisco('localhost:50051',
        credentials.createInsecure(), {
        'grpc.keepalive_time_ms': 15000
    });

    for (let i = 0; i < 1000; i++) {
        new Promise((resolve, reject) => {
            client.analisar({
                cpf: '224234',
                dataNascimento: new Date('1984-08-08').toISOString()
            }, (err: any, response: any) => {
                if (err)
                    reject(err.message);
                resolve(response);
            });
        })
            .then(x => console.log(x))
            .catch(x => console.error(x));
    }
}