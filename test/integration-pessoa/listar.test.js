const ServicoExercicio = require('../../src/services/pessoa')
const conexao = require('../../src/database')

describe('Listar pessoa(s)', () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })

    test('Listar uma pessoa com um id valido', async () => {
        const dataValue = await service.PegarUm(7, this.transaction);
        expect(dataValue).not.toBeNull();
    }
    )

    test('Listar uma pessoa com um id invalido', async () => {
        const result = () => service.PegarUm(null, this.transaction);
        expect(result).rejects.toThrowError('Favor corretamente o id.');
    }
    )

    test('Listar todas as pessoas', async () => {
        const dataValue = await service.PegarTodos();
        expect(dataValue).not.toBeNull();
    }
    )

    test('Listar uma pessoa com letra no id', async () => {
        const result = () => service.PegarUm('a', this.transaction);
        expect(result).rejects.toThrowError('Favor corretamente o id.');
    })
})