const express = require('express')
const categoriaControllers = require('../controllers/categoriaControllers')
const usuariosControllers = require('../controllers/usuariosControllers')
const loginControllers = require('../controllers/loginControllers')
const produtoControllers = require('../controllers/produtoControllers')
const pedidoControllers = require('../controllers/pedidoControllers')
const contatoControllers = require('../controllers/contatoControllers')

const auth = require('../middleware/auth_user_middleware')
const authAdmin = require('../middleware/auth_admin_middleware')


const router = express.Router()


router.post('/login',loginControllers.login) 
router.post('/usuario',usuariosControllers.novoUsuario)

router.get('/categorias',auth,categoriaControllers.retornaTodosCategorias)
router.post('/categoria',authAdmin,categoriaControllers.novoCategoria)


router.get('/produtos/:id',auth,produtoControllers.pegarProdutos)
router.get('/produtos',auth,produtoControllers.pegartodos)
router.post('/produto',authAdmin,produtoControllers.novoProduto) 
router.put('/produto/:id',authAdmin,produtoControllers.editarProduto) 
router.delete('/produto/:id',authAdmin,produtoControllers.remover)  



router.post('/pedido',auth,pedidoControllers.novoPedido)
router.post('/pedidos',auth,pedidoControllers.pegarPedidos) 
router.put('/pedido/:id',authAdmin,pedidoControllers.editarPedido) 
router.delete('/pedido/:id',authAdmin,pedidoControllers.remover) 


router.get('/contatos',authAdmin,contatoControllers.retornaTodosContato)
router.post('/contato',contatoControllers.novoContato)


module.exports = router