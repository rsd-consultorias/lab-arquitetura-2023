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
        credentials.createInsecure());

    for (let i = 0; i < 1000; i++) {
        client.analisar({
            cpf: '224234',
            dataNascimento: '1984-08-08'
        }, (err: any, response: any) => {
            if (err)
                console.log(err);

            console.log(response);
        });
    }
}

main();