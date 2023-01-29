export interface IAnaliseScoreContract {
    analise(props: {cpf: string, dataNascimento: Date}): number
}