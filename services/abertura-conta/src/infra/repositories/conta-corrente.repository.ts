import { randomUUID } from 'crypto'
import { IContaCorrenteRepository } from "rsd-app-core/interfaces/conta-corrente.repository"
import { RepositoryResponse } from "rsd-app-core/types/repository.response"
import { DataTypes, Model, ModelCtor, Sequelize } from "sequelize"

export class ContaCorrenteRepository implements IContaCorrenteRepository {
    private _repository: ModelCtor<Model<any, any>>

    constructor(private sequelize: Sequelize) {
        this._repository = this.sequelize.define('ContaCorrente', {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            id_correntista: {
                type: DataTypes.UUIDV4,
                allowNull: false,
            },
            agencia: {
                type: DataTypes.STRING(4),
                allowNull: false
            },
            conta: {
                type: DataTypes.STRING(6),
                allowNull: false,
                unique: true
            },
            dataAbertura: {
                type: DataTypes.DATE,
                allowNull: false
            },
            saldoAtual: DataTypes.INTEGER
        }, {
            paranoid: true
        })
    }

    async inserir(props: { agencia: string, conta: string ,idCorrentista: string }): Promise<RepositoryResponse<any>> {
        try {
            await this._repository.create({
                id: randomUUID(),
                id_correntista: props.idCorrentista,
                agencia: props.agencia,
                conta: props.conta,
                dataAbertura: new Date(),
                saldoAtual: 0
            })
            return { success: true, data: props }
        } catch (error) {
            return { success: false, data: props, messagens: [`NÃO FOI POSSÍVEL GRAVAR O REGISTRO: [${error}]`] }
        }
    }

    async listarTodas(): Promise<RepositoryResponse<any[]>> {
        return { success: true, data: await this._repository.findAll() }
    }
}