const { describe, expect, it } = require('@jest/globals');
const ServicoExercicio = require("../../src/services/pessoa");
const conexao = require("../../src/database");

describe('Testes do primeiro exercício', () => {
   const servico = new ServicoExercicio()
   beforeAll(async () => {
      this.transaction = await conexao.transaction();
      console.info('Iniciando TDD com jest!');
   });
   afterAll(() => {
      this.transaction.rollback()
      console.info('Encerrados os testes');
   });

   it('Should add a person', async () => {
      const mockPessoa = { nome: "teste1", email: "teste1", senha: "teste" }

      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)

      expect(dataValues.nome).toBe(mockPessoa.nome);
      expect(dataValues.email).toBe(mockPessoa.email);
      expect(dataValues.senha).toBe(mockPessoa.senha);
   })

})
