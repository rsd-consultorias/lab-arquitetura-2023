export async function analisarRiscoWorker(props: any): Promise<any> {
    return new Promise((resolv, reject) => {
        setTimeout(() => {
            resolv({
                cpf: props.cpf,
                nome: 'fulano de tal',
                dataNascimento: props.dataNascimento,
                score: Math.trunc(Math.random() * 1000)
            });
        }, 5000);
    });
}
