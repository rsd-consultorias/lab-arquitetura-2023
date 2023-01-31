export type AnaliseRiscoRequest = {
    cpf: string,
    dataNascimento: Date
};

export type AnaliseRiscoResponse = {
    cpf: string,
    nome: string,
    dataNascimento: Date,
    score: number
};
