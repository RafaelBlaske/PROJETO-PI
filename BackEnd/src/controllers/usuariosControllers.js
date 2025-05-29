const usuarios = require("../models/Usuario");
const hashPasswordService = require('../service/hash_password_service')

class Usuarios {

  async novoUsuario(req, res) {
    let { Nome, Email,Senha,IdTipo } = req.body;

    let result = await usuarios.criar(Nome,Email,hashPasswordService(Senha),IdTipo)

    result.validated
      ? res
          .status(201)
          .json({ success: true, message: "Usuario Cadastrado com Sucesso" })
      : res.status(404).json({ success: false, message: result.error });
  }
}

module.exports = new Usuarios();