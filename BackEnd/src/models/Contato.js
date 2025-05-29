const knex = require("../config/data");

class Contato {
  async PegarContato() {
    try {
      let contato = await knex
        .select(["idContato", "Nome", "Assunto", "Texto"])
        .table("Contato");
      return { validate: true, values: contato };
    } catch (error) {
      return { validate: false, error: error };
    }
  }

  async criar (Nome, Assunto, Texto) {
    try {
      await knex
        .insert({
          Nome: Nome,
          Assunto: Assunto,
          Texto: Texto,
        })
        .table("Contato");
      return { validated: true };
    } catch (error) {
      return { validated: false, error: error };
    }
  }
}

module.exports = new Contato();
