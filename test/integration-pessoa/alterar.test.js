const ServicoExercicio = require('../../src/services/pessoa')
const conexao = require('../../src/database')

describe("Alterar pessoa", () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })


    test("Alterar uma pessoa", async () => {
        const dataTest = {
            nome: "Teste",
            email: "teste@gmail.com",
            senha: "12345678",
        }

        const dataValue = await service.Alterar(7, dataTest, this.transaction);

        expect(dataValue.email).toEqual(dataTest.email)
        expect(dataValue.nome).toEqual(dataTest.nome)
        expect(dataValue.senha).toEqual(dataTest.senha)
    }
    )

    test("Alterar uma pessoa sem nome", async () => {
        const dataTest = {
            nome: null,
            email: "teste@gmail.com",
            senha: "12345678"
        }

        const result = () => service.Alterar(7, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Favor preencher o nome.")
    }
    )

    test("Alterar uma pessoa sem email", async () => {
        const dataTest = {
            nome: "Teste",
            email: null,
            senha: "12345678"
        }

        const result = () => service.Alterar(7, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Favor preencher o email.")
    }
    )

    test("Alterar uma pessoa sem senha", async () => {
        const dataTest = {
            nome: "Teste",
            email: "teste@gmail.com",
            senha: null
        }

        const result = () => service.Alterar(7, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Favor preencher o senha.")
    }
    )
});