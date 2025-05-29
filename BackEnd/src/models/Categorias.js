const knex = require("../config/data");

class Categorias {
  async PegarCategorias() {
    try {
      let categorias = await knex
        .select(["idCategoria", "Nome"])
        .table("Categoria");
      return { validate: true, values: categorias };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome) {
    try {
      await knex.insert({ Nome: Nome}).table("Categoria");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Categorias();