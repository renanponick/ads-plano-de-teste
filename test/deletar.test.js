const ServicoExercicio = require('../src/services/pessoa')
const conexao = require('../src/database')

describe('Deletar pessoas do Banco', () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })

    test('Deletar uma pessoa', async () => {
        const dataValue = await service.Deletar(1, this.transaction);
        expect(dataValue).not.toBeNull();
    })

    test('Deletar passando id invalido', async () => {
        const result = () => service.Deletar(15, this.transaction);
        expect(result).rejects.toThrowError('Pessoa não registrada.');
    })

    test('Deletar passando letra no id', async () => {
        const result = () => service.Deletar('h', this.transaction);
        expect(result).rejects.toThrowError('Id incorreto.');
    })

    test('Deletar passando id vazio', async () => {
        const result = () => service.Deletar(null, this.transaction);
        expect(result).rejects.toThrowError('Id incorreto.');
    })
})