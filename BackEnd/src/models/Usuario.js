const knex = require("../config/data");

class Usuario {
  async PegarEmail(Email) {
    try {
      let usuarios = await knex
        .select(["idUsuario", "Nome", "Email", "IdTipo","Senha"])
        .where({ Email: Email })
        .table("Usuario");
      return { validate: true, values: usuarios };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar(Nome, Email, Senha, IdTipo) {
    try {
      await knex
        .insert({ Nome: Nome, Email: Email, Senha: Senha, IdTipo: IdTipo })
        .table("Usuario");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Usuario();
