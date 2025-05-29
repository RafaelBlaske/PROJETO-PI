const pedidos = require("../models/Pedidos");

class Pedidos {
  async pegarPedidos(req, res) {
    let { Status } = req.body;

    let resultado = await pedidos.PegarPedidos(Status);
    return !resultado.validate
      ? res.status(404).json({ success: false, message: resultado.error })
      : res.status(200).json({ success: true, values: resultado.values });
  }

  async novoPedido(req, res) {
    let { ProdutoID, UsuarioID } = req.body;

    let result = await pedidos.criar(ProdutoID, UsuarioID);

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Pedido Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }

  async editarPedido(req, res) {
    let id = req.params.id;
    if (isNaN(id)) {
      res.status(404).json({ success: false, message: "Parametro Inválido" });
    } else {
      let result = await pedidos.alterar(id,"Finalizado");
      result.validated
        ? res.status(200).json({ success: true, message: result.message })
        : res.status(406).json({ success: false, message: result.error });
    }
  }

  async remover(req, res) {
    let id = req.params.id;
    let result = await pedidos.delete(id);
    result.validated
      ? res.status(200).json({ success: true, message: result.message })
      : res.status(406).json({ success: false, message: result.error });
  }
}

module.exports = new Pedidos();
