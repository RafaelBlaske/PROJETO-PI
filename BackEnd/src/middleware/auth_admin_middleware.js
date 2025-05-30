// requerer as variaveis de ambiente
require('dotenv').config()
// requerer a biblioteca do jwt 
const jwt = require('jsonwebtoken')

// criar o metodo de autenticacao para o user admin
module.exports = function(req,res,next){
    const authToken = req.headers['authorization']

    if (authToken != undefined) {
        const bearer = authToken.split(' ')
        let token = bearer[1]

        try {
            let decode = jwt.verify(token,process.env.SECRET)
            return decode.IdTipo == 2
            ? next()
            : res.status(403).json({success: false, message: 'Usuario sem permissão'})
        } catch (error) {
            return res.status(403).json({success: false, message: 'token invalido'})
        }

    } else {
        return res.status(403).json({success: false, message: 'Usuario não autenticado'})
    }

}