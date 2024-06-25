const { describe, expect, it, beforeAll, afterAll } = require('@jest/globals');
const conexao = require('../../src/database');
const ServicoExercicio = require('../../src/services/pessoa');

describe('Teste de listar todas as pessoas', () => {
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

    it('Deve listar todas as pessoas cadastradas', async () => {
        // Adicionar algumas pessoas para o teste
        const mockPessoa1 = {
            nome: "Pessoa 1",
            email: "pessoa1@gmail.com",
            senha: "senha123"
        };
        const mockPessoa2 = {
            nome: "Pessoa 2",
            email: "pessoa2@gmail.com",
            senha: "senha456"
        };

        await servico.Adicionar(mockPessoa1, this.transaction);
        await servico.Adicionar(mockPessoa2, this.transaction);

        // Obter todas as pessoas cadastradas
        const pessoas = await servico.PegarTodos(this.transaction);

        // Verificar se foram retornadas duas pessoas
        expect(pessoas.length).toBe(2);

        // Verificar os dados das pessoas
        expect(pessoas[0].nome).toBe(mockPessoa1.nome);
        expect(pessoas[0].email).toBe(mockPessoa1.email);
        expect(pessoas[1].nome).toBe(mockPessoa2.nome);
        expect(pessoas[1].email).toBe(mockPessoa2.email);
    });
});
