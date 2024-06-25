const Pessoa = require('../models/pessoa.js');

class RepositorioExercicio {

    async PegarUm(id){
        return Pessoa.findOne({
            where: {
                id
            }
        })
    }

    async PegarTodos(transaction){
        return Pessoa.findAll({transaction})
    }

    async Adicionar(pessoa, transaction){
        return Pessoa.create({ ...pessoa}, { transaction })
    }

    async BuscarPorNome(nome) {
        return Pessoa.findOne({ where: { nome: nome } });
    }

    async Alterar(id, pessoa){
        return Pessoa.update(pessoa, {
            where: {
                id
            }
        })
    }

    async Deletar(id){
        return Pessoa.destroy({
            where: {
                id
            }
        })
    }

}

module.exports = RepositorioExercicio