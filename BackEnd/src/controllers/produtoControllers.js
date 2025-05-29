const produtos = require("../models/Produtos");

class Produtos {
  async pegarProdutos(req, res) {
    let resultado = await produtos.PegarProdutos(req.params.id);
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

    async pegartodos(req, res) {
    let resultado = await produtos.pegarTodos();
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoProduto(req, res) {
    let { Nome, Preco, Descricao, CategoriaID } = req.body;

    let result = await produtos.criar(Nome, Preco, Descricao, CategoriaID);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Produto Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }

  async editarProduto(req, res) {
    let id = req.params.id;
    let { Nome, Preco, Descricao, CategoriaID } = req.body;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await produtos.update(id,Nome,Preco,Descricao,CategoriaID)
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }

  async remover(req, res) {
    let id = req.params.id;
    let result = await produtos.delete(id)
    result.validated
      ? res.status(200).json({ success: true, message: result.message })
      : res.status(406).json({ success: false, message: result.error });
  }
}

module.exports = new Produtos();
