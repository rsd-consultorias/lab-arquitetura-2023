import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
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

const protoDescriptor = loadPackageDefinition(packageDefinition);
const rsdanaliserisco = protoDescriptor.rsdanaliserisco;

function analiseRisco(dados: any) {
    console.log('Teste');
    return { cpf: dados.cpf, nome: 'fulano de tal', dataNascimento: dados.dataNascimento, score: 900 };
}

function Analisar(call: any, callback: any) {
    callback(null, analiseRisco(call.request));
}

function getServer() {
    const server = new Server();
    // @ts-ignore
    server.addService(rsdanaliserisco.AnaliseRisco.service, {
        analisar: Analisar
    });

    return server;
}

const analiseServer = getServer();

analiseServer.bindAsync('0.0.0.0:50051',
    ServerCredentials.createInsecure(),
    () => {
        analiseServer.start();
    }
);
