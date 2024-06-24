const {describe, expect, it} = require('@jest/globals');
const conexao = require('../../src/database');
const ServicoExercicio = require('../../src/services/pessoa');
const sequelize = require('../../src/models/pessoa')

describe('Teste de Alterar pessoa', () => {
    const serivco = new ServicoExercicio();

    beforeAll(async () => {
        this.transaction = await conexao.transaction();
        console.info('Iniciando TDD com jest!');
    });
    afterAll(() => {
        this.transaction.rollback();
        console.info('Encerrando os testes')
    });

    it('"O QA deverá informar por meio do ID, o usuário a ser alterado em todos os campos a serem alterados. id: 1', async () => {
        const mock = { nome: 'joana', email: 'batata@123', senha: '1234'};
        const mock_update = { nome: 'joana da silva', email: "mariasilva@gmail.com", senha: '123456789'};

        const transaction = await db.sequelize.transaction();

        try {
            const { dataValues: pessoaCriada } = await servico.Adicionar(mock, transaction);

            // Atualizar a pessoa usando o serviço
            const { dataValues: pessoaAtualizada } = await servico.Atualizar(pessoaCriada.id, mock_update, transaction);

            // Verificações
            expect(pessoaAtualizada.nome).toBe(mock_update.nome);
            expect(pessoaAtualizada.email).toBe(mock_update.email);
            expect(pessoaAtualizada.senha).toBe(mock_update.senha);

            // Confirmar a transação
            await transaction.commit();
        } catch (error) {
            // Reverter a transação em caso de erro
            await transaction.rollback();
            throw error;
        }
    })
})