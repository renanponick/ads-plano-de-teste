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

    /* it('" CT24- No Postman digitar um id válido  - O sistema deverá mostrar as informações da pessoa do id respectivo."', async () => {
        const mockPessoa = { id: 1 }
        // const result = await servico.Adicionar(mockPessoa)
        // const dataValues = result.dataValues
        const { dataValues } = await servico.PegarTodos(mockPessoa, this.transaction)
        
        expect(mockPessoa.id).toBe(dataValues.id);
        // expect(mockPessoa.email).toBe(dataValues.email);
        // expect(mockPessoa.senha).toBe(dataValues.senha);
    }) */
})
