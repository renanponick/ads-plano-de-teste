const ServicoExercicio = require('../src/services/pessoa')
const conexao = require('../src/database')

describe('Listar pessoas', () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })

    test('Listar uma pessoa', async () => {
        const dataValue = await service.PegarUm(1, this.transaction);
        expect(dataValue).not.toBeNull();
    }
    )

    test('Listar passando um id invalido', async () => {
        const result = () => service.PegarUm(null, this.transaction);
        expect(result).rejects.toThrowError('Id incorreto.');
    }
    )

    test('Listar todas as pessoas do banco', async () => {
        const dataValue = await service.PegarTodos();
        expect(dataValue).not.toBeNull();
    }
    )

    test('Listar passando letra no id', async () => {
        const result = () => service.PegarUm('g', this.transaction);
        expect(result).rejects.toThrowError('Id incorreto.');
    })
})