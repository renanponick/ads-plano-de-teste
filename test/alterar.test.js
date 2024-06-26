const ServicoExercicio = require('../src/services/pessoa')
const conexao = require('../src/database')

describe("Alterar pessoas do banco", () => {
    const service = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
    })

    afterAll(() => {
        this.transaction.rollback();
    })


    test("Alterar dados de uma pessoa", async () => {
        const dataTest = {
            nome: "renann",
            email: "renann@sc.com",
            senha: "1234",
        }

        const dataValue = await service.Alterar(1, dataTest, this.transaction);

        expect(dataValue.email).toEqual(dataTest.email)
        expect(dataValue.nome).toEqual(dataTest.nome)
        expect(dataValue.senha).toEqual(dataTest.senha)
    }
    )

    test("Alterar sem passar nome", async () => {
        const dataTest = {
            nome: null,
            email: "renann@sc.com",
            senha: "1234",
        }
        const result = () => service.Alterar(1, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Insira um nome.")
    }
    )

    test("Alterar sem passar email", async () => {
        const dataTest = {
            nome: "Renan",
            email: null,
            senha: "1234"
        }
        const result = () => service.Alterar(1, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Insira um email.")
    }
    )

    test("Alterar uma pessoa sem senha", async () => {
        const dataTest = {
            nome: "Renan",
            email: "renan@senac.com",
            senha: null
        }

        const result = () => service.Alterar(1, dataTest, this.transaction);
        expect(result).rejects.toThrowError("Insira uma senha.")
    }
    )
});