const categorias = require("../models/Categorias");

class Categorias {
  async retornaTodosCategorias(req, res) {
    let resultado = await categorias.PegarCategorias();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoCategoria(req, res) {
    let { Nome } = req.body;

    let result = await categorias.criar(Nome);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Categoria Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }
}

module.exports = new Categorias();
