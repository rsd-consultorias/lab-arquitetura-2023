import { Dinheiro } from "../types/dinheiro.type"

export class ContaCorrente {

    constructor(
        public agencia?: string,
        public numero?: string,
        public ativa?: boolean,
        public dataAbertura?: Date,
        public saldoAtual?: Dinheiro) { }
}