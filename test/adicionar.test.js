const ServicoExercicio = require('../src/services/pessoa.js');
const conexao = require('../src/database');

describe("Adicionar pessoa", () => {
    let transaction;
    const service = new ServicoExercicio();

    beforeAll(async function () {
        transaction = await conexao.transaction();
    });

    afterAll(async function () {
        await transaction.rollback();
    });

    test("Adicionar uma pessoa no banco", async () => {
        const dataTest = {
            nome: "Renan",
            email: "renan@senac.com",
            senha: "1234"
        };

        const { dataValues } = await service.Adicionar(dataTest, transaction);
        expect(dataValues.nome).toBe(dataTest.nome);
        expect(dataValues.email).toBe(dataTest.email);
        expect(dataValues.senha).toBe(dataTest.senha);
    });

    test("Adicionar sem nome", async () => {
        const dataTest = {
            nome: null,
            email: "renan@sc.com",
            senha: "1234"
        };
        await expect(service.Adicionar(dataTest, transaction)).rejects.toThrowError("Insira o nome de usuário.");
    });

    test("Adicionar sem email", async () => {
        const dataTest = {
            nome: "renan sem email",
            email: null,
            senha: "1234"
        };
        await expect(service.Adicionar(dataTest, transaction)).rejects.toThrowError("Insira o email.");
    });

    test("Adicionar sem senha", async () => {
        const dataTest = {
            nome: "Renan sem senha",
            email: "renan@senacsc.com",
            senha: null
        };
        await expect(service.Adicionar(dataTest, transaction)).rejects.toThrowError("Insira a senha.");
    });
});
