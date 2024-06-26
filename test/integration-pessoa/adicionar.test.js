const ServicoExercicio = require('../../src/services/pessoa')
const conexao = require('../../src/database')


describe("Adicionar pessoa", () => {
   const service = new ServicoExercicio();

   beforeAll(async () => {
      this.transaction = await conexao.transaction();
   })

   afterAll(() => {
      this.transaction.rollback();
   })

   test("Adicionar uma pessoa", async () => {
      const dataTest = {
         nome: "Teste",
         email: "teste@teste.com",
         senha: "12345678"
      }

      const { dataValues } = await service.Adicionar(dataTest, this.transaction);

      expect(dataValues.nome).toBe(dataTest.nome)
      expect(dataValues.email).toBe(dataTest.email)
      expect(dataValues.senha).toBe(dataTest.senha)
   })

   test("Adicionar uma pessoa sem nome", async () => {
      const dataTest = {
         nome: null,
         email: "teste@gmail.com",
         senha: "12345678"
      }

      const result = () => service.Adicionar(dataTest, this.transaction);
      expect(result).rejects.toThrowError("Favor preencher o nome.")
   })

   test("Adicionar uma pessoa sem email", async () => {
      const dataTest = {
         nome: "Teste",
         email: null,
         senha: "12345678"
      }

      const result = () => service.Adicionar(dataTest, this.transaction);
      expect(result).rejects.toThrowError("Favor preencher o email.")
   })

   test("Adicionar uma pessoa sem senha", async () => {
      const dataTest = {
         nome: "Teste",
         email: "teste@gmail.com",
         senha: null
      }

      const result = () => service.Adicionar(dataTest, this.transaction);
      expect(result).rejects.toThrowError("Favor preencher o senha.")
   })

})