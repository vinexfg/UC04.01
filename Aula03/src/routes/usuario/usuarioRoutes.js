import express from 'express'
import { UsuarioController } from "../../controllers/usuario/UsuarioControllers.js"


const router = express.Router();

//Rota para listar todos os usuarios

router.get('/', UsuarioController.listarUsuarios);


//Rota para buscar usuario por id

router.get('/:id', UsuarioController.buscarPorId);

export default router