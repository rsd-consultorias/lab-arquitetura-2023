import { ICorrentistaRepository } from "rsd-app-core/interfaces/correntista.repository";
import { Correntista } from "rsd-app-core/models/correntista.model";
import { RepositoryResponse } from "rsd-app-core/types/repository.response";
import { randomUUID } from 'crypto';
import { DataTypes, Model, ModelCtor, Sequelize, UniqueConstraintError } from "sequelize";

export class CorrentistaRepository implements ICorrentistaRepository {
    private _repository: ModelCtor<Model<any, any>>;

    constructor(readonly sequelize: Sequelize) {
        this._repository = this.sequelize.define('Correntistas', {
            id: {
                type: DataTypes.UUIDV4,
                primaryKey: true
            },
            nome: {
                type: DataTypes.STRING(256),
                allowNull: false,
            },
            cpf: {
                type: DataTypes.STRING(11),
                allowNull: false,
                unique: true
            },
            dataNascimento: {
                type: DataTypes.DATE,
                allowNull: false
            },
            score: DataTypes.INTEGER,
            matricula: {
                type: DataTypes.STRING(6),
                unique: true
            }
        }, {
            paranoid: true
        });
    }

    async inserirCorrentistaAsync(correntista: Correntista): Promise<RepositoryResponse<Correntista>> {
        try {
            correntista.id = randomUUID();
            await this._repository.create({
                id: correntista.id,
                nome: correntista.nome,
                cpf: correntista.cpf,
                dataNascimento: correntista.dataNascimento,
                score: correntista.score,
                matricula: correntista.matricula
            });
            return { success: true, data: correntista };
        } catch (error: any) {
            if (error.name! === 'SequelizeUniqueConstraintError') {
                return { success: false, data: correntista, messagens: [`NÃO FOI POSSÍVEL GRAVAR O REGISTRO: ${(error as UniqueConstraintError).errors[0].message}`] };
            }
            return { success: false, data: correntista, messagens: [`NÃO FOI POSSÍVEL GRAVAR O REGISTRO: [${error}]`] };
        }
    }

    alterarCorrentistaAsync(correntista: Correntista): Promise<RepositoryResponse<Correntista>> {
        throw new Error("Method not implemented.");
    }

    excluirCorrentistaById(id: string): Promise<RepositoryResponse<Correntista>> {
        throw new Error("Method not implemented.");
    }

    async buscarTodos(...arg: any[]): Promise<Correntista[]> {
        const result: Correntista[] = [];
        const found = await this._repository.findAll({
            attributes: ['id', 'matricula', 'cpf', 'nome', 'dataNascimento', 'score'],
            order: [['nome', 'ASC']]
        });

        found.forEach((item: any) => {
            result.push({
                id: item.id,
                nome: item.nome,
                cpf: item.cpf,
                dataNascimento: item.dataNascimento,
                matricula: item.matricula,
                score: item.score
            });
        });

        return result;
    }

    buscarPorCpf(id: string): Promise<Correntista> {
        throw new Error("Method not implemented.");
    }
}
