const Pessoa = require('../models/pessoa.js');

class RepositorioExercicio {

    async PegarUm(id){
        return Pessoa.findOne({
            where: {
                id
            }
        })
    }

    async PegarTodos(){
        return Pessoa.findAll()
    }

    async Adicionar(pessoa, transaction){
        return Pessoa.create(pessoa, { transaction })
    }

    async Alterar(id, pessoa, transaction){
        const result = await Pessoa.update(pessoa, {
            where: {
                id
            },
            transaction
        })
        return result
    }

    async Deletar(id, transaction){
        return Pessoa.destroy({
            where: {
                id
            },
            transaction
        })
    }

}

module.exports = RepositorioExercicio