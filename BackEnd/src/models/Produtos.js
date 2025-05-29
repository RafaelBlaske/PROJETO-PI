const knex = require("../config/data");

class Produtos {
  async PegarProdutos(id) {
    try {
      let produtos = await knex
        .select(["idProduto", "Nome", "Preco", "Descricao"])
        .where({ CategoriaID: id })
        .table("Produto");
      return { validate: true, values: produtos };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async pegarTodos() {
    try {
      let produtos = await knex
        .select(["idProduto", "Nome", "Preco", "Descricao"])
        .table("Produto");
      return { validate: true, values: produtos };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome, Preco, Descricao, CategoriaID) {
    try {
      await knex
        .insert({
          Nome: Nome,
          Preco: Preco,
          Descricao: Descricao,
          CategoriaID: CategoriaID,
        })
        .table("Produto");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async update(id, Nome, Preco, Descricao, CategoriaID) {
    try {
      await knex
        .update({
          Nome: Nome,
          Preco: Preco,
          Descricao: Descricao,
          CategoriaID: CategoriaID,
        })
        .where({ idProduto: id })
        .table("Produto");
      return { validated: true, message: "Produto editado com Sucesso!!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({ idProduto: id }).table("Produto");
      return { validated: true, message: "Produto Excluido com Sucesso!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Produtos();
