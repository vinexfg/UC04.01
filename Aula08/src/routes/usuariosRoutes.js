import { Router } from "express";
import { UsuarioController } from "../controllers/UsuarioController.js";
import { verificarToken } from "../middlewares/authMiddleware.js";

const router = Router();

// Rotas públicas (não precisam de autenticação)
router.post('/usuarios', UsuarioController.criarUsuario);
router.post('/login', UsuarioController.login);

// Rotas protegidas (precisam de autenticação)
router.get('/usuarios', verificarToken, UsuarioController.listarUsuarios);
router.get('/usuarios/:id', verificarToken, UsuarioController.buscarUsuarioPorId);
router.put('/usuarios/:id', verificarToken, UsuarioController.atualizarUsuario);
router.patch('/usuarios/:id', verificarToken, UsuarioController.atualizarParcialmente);
router.delete('/usuarios/:id', verificarToken, UsuarioController.deletarUsuario);


export default router;
a