const { describe, expect, it } = require('@jest/globals');
const conexao = require('../../src/database');
const ServicoExercicio = require("../../src/services/pessoa");

describe('Testes do primeiro exercício', () => {

   const servico = new ServicoExercicio()

   // Executado antes de TODOS os testes
   beforeAll(async () => {
      this.transaction = await conexao.transaction();
      console.info('Iniciando TDD com jest!');
   });

   // Executado após TODOS os testes
   afterAll(() => {
      this.transaction.rollback();
      console.info('Encerrados os testes');
   });

   it('" CT01 - No Postman preencher campo nome, com um nome válido: nome: Joana Moura - O sistema deverá salvar o nome no banco de dados."', async () => {
      const mockPessoa = { nome: "Joana Moura", email: "batata@123.com", senha: "123456" }
      // const result = await servico.Adicionar(mockPessoa)
      // const dataValues = result.dataValues
      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)
      
      expect(mockPessoa.nome).toBe(dataValues.nome);
      expect(mockPessoa.email).toBe(dataValues.email);
      expect(mockPessoa.senha).toBe(dataValues.senha);
   })

   it('" CT02 - No Postman preencher o campo nome com número. nome: 1 - Por favor, não use números no campo nome. Apenas letras são permitidas."', async () => {
      const mockPessoa = { nome: 1, email: "batata@123.com", senha: "123456" }
      // const result = await servico.Adicionar(mockPessoa)
      // const dataValues = result.dataValues
      const result = () => servico.Adicionar(mockPessoa, this.transaction)
      
      expect(result).rejects.toThrowError('Por favor, não use números no campo nome. Apenas letras são permitidas');
      // expect(mockPessoa.email).toBe(dataValues.email);
      // expect(mockPessoa.senha).toBe(dataValues.senha);
   })

   it('" CT14 - No Postman preencher campo email, com um email válido: email: joana@gmail.com - O sistema deverá salvar o email no banco de dados."', async () => {
      const mockPessoa = { nome: "Joana Moura", email: "joana@gmail.com", senha: "123456" }
      // const result = await servico.Adicionar(mockPessoa)
      // const dataValues = result.dataValues
      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)
      
      expect(mockPessoa.nome).toBe(dataValues.nome);
      expect(mockPessoa.email).toBe(dataValues.email);
      expect(mockPessoa.senha).toBe(dataValues.senha);
   })

   it('" CT19- No Postman preencher campo senha, com um senha válido: senha: C@ch0rr0$80nito$ - O sistema deverá salvar o senha no banco de dados."', async () => {
      const mockPessoa = { nome: "Joana Moura", email: "joana2@gmail.com", senha: "C@ch0rr0$80nito$" }
      // const result = await servico.Adicionar(mockPessoa)
      // const dataValues = result.dataValues
      const { dataValues } = await servico.Adicionar(mockPessoa, this.transaction)
      
      expect(mockPessoa.nome).toBe(dataValues.nome);
      expect(mockPessoa.email).toBe(dataValues.email);
      expect(mockPessoa.senha).toBe(dataValues.senha);
   })
})
