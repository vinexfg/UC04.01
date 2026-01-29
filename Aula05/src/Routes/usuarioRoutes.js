import express from 'express';
import { UusuarioController } from '../controllers/UsuarioController.js';

const router = express.Router();

// Listar todos os usuários
router.get('/', UusuarioController.listarUsuario);

// Buscar usuário por ID
router.get('/:id', UusuarioController.buscarPorId);

// Criar novo usuário
router.post('/', UusuarioController.criarUsuario);

// Atualizar usuário
router.put('/:id', UusuarioController.atualizarUsuario);

// Deletar usuário
router.delete('/:id', UusuarioController.deletarUsuario);

export default router;
