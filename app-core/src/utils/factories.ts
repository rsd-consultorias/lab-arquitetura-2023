import { Correntista } from "../models/correntista.model";

export function makeCorrentistaFromProps(props: {
    id?: string, matricula?: string, nome?: string,
    cpf?: string, dataNascimento?: Date, score?: number
}): Correntista {
    return new Correntista(
        props.id,
        props.matricula,
        props.nome,
        props.cpf,
        props.dataNascimento,
        props.score
    );
}
