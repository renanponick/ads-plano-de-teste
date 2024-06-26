const RepositorioExercicio= require("../repositories/pessoa.js")

const repositorio = new RepositorioExercicio()
class ServicoExercicio {

    async PegarUm(id, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Id incorreto.")
      }
      return repositorio.PegarUm(id, transaction)
    }

    async PegarTodos(){
      return repositorio.PegarTodos()
    }

    async Adicionar(pessoa, transaction){
      if(!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if(!pessoa.nome) {
        throw new Error("Insira o nome de usuário.")
      } else if(!pessoa.email) {
        throw new Error("Insira o email.")
      } else if(!pessoa.senha) {
        throw new Error("Insira a senha.")
      }

      return repositorio.Adicionar(pessoa, transaction)
    }

    async Alterar(id, pessoa, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Favor corretamente o id.")
      }

      if(!pessoa) {
        throw new Error("Favor preencher o pessoa.")
      } else if(!pessoa.nome) {
        throw new Error("Insira um nome.")
      } else if(!pessoa.email) {
        throw new Error("Insira um email.")
      } else if(!pessoa.senha) {
        throw new Error("Insira uma senha.")
      }


      await repositorio.Alterar(id, pessoa, transaction)

      return this.PegarUm(id, transaction)
    }

    async Deletar(id, transaction){
      if(!id || isNaN(id)) {
        throw new Error("Id incorreto.")
      }

      const pessoa = await this.PegarUm(id, transaction)

      if(!pessoa) {
        throw new Error("Pessoa não registrada.")
      }

      return repositorio.Deletar(id, transaction)
    }

}
module.exports = ServicoExercicio