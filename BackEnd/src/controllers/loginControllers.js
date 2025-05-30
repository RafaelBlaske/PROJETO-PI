require("dotenv").config();

const usuarios = require("../models/Usuario");

const comparePasswordService = require("../service/compare_password_service");

const jwt = require("jsonwebtoken");

const knex = require("../config/data");

class LoginController {
  async login(req, res) {
    let { Email, Senha } = req.body;

    let usuario = await usuarios.PegarEmail(Email);

    if (usuario.values != undefined) {
      let passValidated = comparePasswordService(Senha, usuario.values[0].Senha);
      if (passValidated) {

        let token = jwt.sign(
          {
            Email: usuario.values[0].Email,
            IdTipo: usuario.values[0].IdTipo,
            IdUsuario: usuario.values[0].idUsuario
          },
          process.env.SECRET,
          { expiresIn: "1h" }
        );
        res
          .status(200)
          .json({
            success: true,
            tipo:usuario.values[0].IdTipo,
            idUsuario: usuario.values[0].idUsuario,
            Token: token,
          });
      } else {
        res.status(406).json({ success: false, message: "Senha invalida" });
      }
    } else {
      usuario.values = undefined
        ? res
            .status(406)
            .json({ success: false, message: "Usuario não encontrado" })
        : res.status(404).json({ success: false, message: usuario.error });
    }
  }
}

module.exports = new LoginController();
