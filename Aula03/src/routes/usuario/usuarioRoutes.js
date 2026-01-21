import express from 'express'
import { UsuarioController } from "../../controllers/usuario/UsuarioControllers.js"


const router = express.Router();

//Rota para listar todos os usuarios

router.get('/', UsuarioController.listarUsuarios);


//Rota para buscar usuario por id

router.get('/:id', UsuarioController.buscarPorId);

//Rota para criar um nobo usuario

router.post('/', UsuarioController.criarUsuario)
export default router

//rota para atualizar usuario

router.put('/:id', UsuarioController.atualizarUsuario)

// rota de delatar usuario

router.delete('/:id', UsuarioController.deletarUsuario)

// FIM