const ServicoExercicio = require('../../src/services/pessoa')
const conexao = require('../../src/database')

describe('Deletar pessoa(s)', () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })

    test('Deletar uma pessoa com um id valido', async () => {
        const dataValue = await service.Deletar(7, this.transaction);
        expect(dataValue).not.toBeNull();
    })

    test('Deletar uma pessoa com um id invalido', async () => {
        const result = () => service.Deletar(3, this.transaction);
        expect(result).rejects.toThrowError('Pessoa não encontrada.');
    })

    test('Deletar uma pessoa com letra no id', async () => {
        const result = () => service.Deletar('a', this.transaction);
        expect(result).rejects.toThrowError('Favor corretamente o id.');
    })

    test('Deletar uma pessoa com id null', async () => {
        const result = () => service.Deletar(null, this.transaction);
        expect(result).rejects.toThrowError('Favor corretamente o id.');
    })
})