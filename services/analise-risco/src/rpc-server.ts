import { loadPackageDefinition, Server, ServerCredentials } from '@grpc/grpc-js';
import { loadSync } from '@grpc/proto-loader';
import { analisarRiscoWorker } from './workers/analise-risco.worker';

const packageDefinition = loadSync(
    `${__dirname}/../../.proto/analise-risco.proto`,
    {
        keepCase: true,
        longs: String,
        enums: String,
        defaults: true,
        oneofs: true
    });

const protoDescriptor = loadPackageDefinition(packageDefinition);
const rsdanaliserisco = protoDescriptor.rsdanaliserisco;

async function analiseRisco(dados: any) {
    const resultado = await analisarRiscoWorker(dados);
    console.log(resultado);
    return resultado;
}

async function Analisar(call: any, callback: any) {
    callback(null, await analiseRisco(call.request));
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
