const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const conexao = require('../../src/database');
const ServicoExercicio = require('../../src/services/pessoa');

describe('Teste de Deletar pessoa', () => {
    let servico;
    let transaction;

    beforeAll(async () => {
        servico = new ServicoExercicio();
        transaction = await conexao.transaction();
        console.info('Iniciando TDD com jest!');
    });

    afterAll(async () => {
        await transaction.rollback();
        console.info('Encerrando os testes');
    });

    it('Deve deletar uma pessoa por meio do id', async () => {
        const mockPessoa = {
            nome: "Alice Da Cunha da Neta de Jesus",
            email: "alicecunhajesus@gmail.com",
            senha: "abacate123"
        };

        // Adicionar a pessoa inicialmente
        const pessoaAdicionada = await servico.Adicionar(mockPessoa, transaction);
        const id = pessoaAdicionada.id;

        // Deletar a pessoa pelo ID
        const dataValue = await servico.Deletar(id, transaction);

        // Verificações
        expect(dataValue).toBe(1); // Espera-se que uma pessoa tenha sido deletada
    });
});
