// requerer as variaveis de ambiete
require('dotenv').config()
// requerer jwt
const jwt = require('jsonwebtoken')

// iniciar middleware
module.exports = function (req,res,next) {
    const auth = req.headers['authorization']

    if(auth != undefined) {
        try {
            const bearer = auth.split(' ')
            let token = bearer[1]

            jwt.verify(token, process.env.SECRET)
            return next()

        } catch (error) {
            return res.status(403).json({success: false,error: error, message: 'Usuario não authenticado'})
        }
    } else {
        return res.status(403).json({success: false, message: 'Usuario não authenticado'})
    }
}