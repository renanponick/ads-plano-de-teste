const { describe, expect, it } = require('@jest/globals');
const ServicoExercicio = require("../../src/services/pessoa");
const conexao = require("../../src/database");

describe('Testes do primeiro exercício', () => {
   const servico = new ServicoExercicio()
   beforeAll(async () => {
      this.transaction = await conexao.transaction();
   });
   afterAll(() => {
      this.transaction.rollback()
   });

   it('Should add a person', async () => {
      const mockPessoa = { nome: "teste1", email: "testeadicionar", senha: "teste" }

      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)

      expect(dataValues.nome).toBe(mockPessoa.nome);
      expect(dataValues.email).toBe(mockPessoa.email);
      expect(dataValues.senha).toBe(mockPessoa.senha);
   })


   it('Should update a person', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" }
      const mockPessoaAlterar = { nome: "teste2", email: "alterar23", senha: "teste2" }

      const adicionado = await servico
         .Adicionar(mockPessoa, this.transaction)

      const alterado = await servico
         .Alterar(adicionado.dataValues.id, mockPessoaAlterar, this.transaction)

      expect(alterado[0]).toBe(1);
   })


   it('Should delete a person', async () => {
      const mockPessoa = { nome: "teste1", email: "alterar", senha: "teste" }

      const adicionado = await servico
         .Adicionar(mockPessoa, this.transaction)
      const resposta = await servico
         .Deletar(adicionado.dataValues.id, this.transaction)

      expect(resposta).toBe(1);
   })


})
