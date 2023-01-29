import { Dinheiro } from "../types/dinheiro.type"

export class ContaCorrente {
    agencia?: string
    numero?: string
    ativa?: boolean
    dataAbertura?: Date
    saldoAtual?: Dinheiro
}