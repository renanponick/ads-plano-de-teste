const RepositorioExercicio= require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

    async PegarUm(id){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }
      return repositorio.PegarUm(id)
    }

    async PegarTodos(transaction){
      const pessoas = await repositorio.PegarTodos(transaction);
      return pessoas;
    }

    
    async Adicionar(pessoa, transaction){
      if(!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if(!pessoa.nome) {
        throw new Error("Favor preencher o nome.")
      } else if(!pessoa.email) {
        throw new Error("Favor preencher o email.")
      } else if(!pessoa.senha) {
        throw new Error("Favor preencher o senha.")
      } else if (/\d/.test(pessoa.nome)) {
        throw new Error('Por favor, não use números no campo nome. Apenas letras são permitidas');
      }

      return repositorio.Adicionar(pessoa, transaction)
    }

    async Alterar(id, pessoa, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      return repositorio.Adicionar(id, pessoa, transaction)
    }

    async Deletar(id, transaction) {
      if (!id || isNaN(id)) {
          throw new Error("Favor informar um ID válido para deletar a pessoa.");
      }
      return repositorio.Deletar(id, transaction);
    }

}
module.exports = ServicoExercicio