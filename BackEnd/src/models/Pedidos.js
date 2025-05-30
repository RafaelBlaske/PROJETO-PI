const knex = require("../config/data");

class Pedidos {
  async PegarPedidos(Status) {
    try {
      let pedidos = await knex("Produto")
        .join("Categoria", "Produto.CategoriaID", "Categoria.idCategoria")
        .join("Pedidos", "Produto.idProduto", "Pedidos.ProdutoID")
        .join("Usuario", "Pedidos.UsuarioID", "Usuario.idUsuario")
        .where("Pedidos.Status", Status)
        .select(
          "Pedidos.idPedidos",
          "Produto.idProduto",
          "Produto.Nome as NomeProduto",
          "Produto.Preco",
          "Produto.Descricao",
          "Categoria.Nome as NomeCategoria",
          "Usuario.idUsuario",
          "Usuario.Nome as NomeUsuario",
          "Usuario.Email as EmailUsuario"
        );
      return { validate: true, values: pedidos };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(ProdutoID, UsuarioID) {
    try {
      await knex
        .insert({
          ProdutoID: ProdutoID,
          UsuarioID: UsuarioID,
          Status: "Preparo",
        })
        .table("Pedidos");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async alterar(id, Status) {
    try {
      await knex
        .update({ Status: Status })
        .where({ idPedidos: id })
        .table("Pedidos");
      return { validated: true, message: "Pedido editado com Sucesso!!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }

  async delete(id) {
    try {
      await knex.delete().where({ idPedidos: id }).table("Pedidos");
      return { validated: true, message: "Pedido Excluido com Sucesso!" };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Pedidos();
