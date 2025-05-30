const contato = require("../models/Contato");

class Contato {
  async retornaTodosContato(req, res) {
    let resultado = await contato.PegarContato();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoContato(req, res) {
    let { Nome, Assunto, Texto } = req.body;

    let result = await contato.criar(Nome, Assunto, Texto);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Contato Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }
}

module.exports = new Contato();
