const {describe, expect, it} = require('@jest/globals');
const conexao = require('../../src/database');
const ServicoExercicio = require('../../src/services/pessoa');
// const sequelize = require('../../src/models/pessoa')

describe('Teste de Alterar pessoa', () => {
    const servico = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
        console.info('Iniciando TDD com jest!');
    });
    afterAll(() => {
        this.transaction.rollback();
        console.info('Encerrando os testes')
    });

    // it('Deve alterar uma pessoa por meio do nome', async () => {
    //     const mockPessoa = {
    //       nome: "Alice Da Cunha da Neta de Jesus",
    //       email: "alicecunhajesus@gmail.com",
    //       senha: "abacate123"
    //     };
      
    //     const pessoaAdicionada = await servico.Adicionar(mockPessoa, this.transaction);
    //     const nomeDaPessoa = mockPessoa.nome;
      
    //     const mockPessoaUpdate = {
    //       email: "updated@domain.com",
    //       senha: "update#password"
    //     };
      
    //     const dataValue = await servico.Alterar(nomeDaPessoa, mockPessoaUpdate, this.transaction);

    //     expect(nomeDaPessoa).toBe(dataValue.dataValues.nome); // O nome não deve ter mudado
    //     expect(mockPessoaUpdate.email).toBe(dataValue.dataValues.email);
    //     expect(mockPessoaUpdate.senha).toBe(dataValue.dataValues.senha);
    // });       
})