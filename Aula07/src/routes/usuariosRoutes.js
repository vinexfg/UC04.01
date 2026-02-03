import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";

const router = Router();

router.get('/usuarios', UsuarioController.listarUsuarios);
router.get('/usuarios/:id', UsuarioController.buscarUsuarioPorId);
router.post('/usuarios', UsuarioController.criarUsuario);
router.put('/usuarios/:id', UsuarioController.atualizarUsuario);
router.delete('/usuarios/:id', UsuarioController.deletarUsuario);
router.

export default router;
