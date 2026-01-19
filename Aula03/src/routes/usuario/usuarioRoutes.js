import express from 'express'
import {UsuarioController} from "../../controllers/usuario/UsuarioControllers"


const router =express.Router();

//Rota para listar todos os usuarios

router.get(',', UsuarioController.listarUsuarios)