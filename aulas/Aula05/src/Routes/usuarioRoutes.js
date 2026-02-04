import express from 'express';
import { UsuarioController } from '../controllers/UsuarioController.js';

const router = express.Router();

// Listar todos os usuários
router.get('/', UsuarioController.listarUsuario);

// Buscar usuário por ID
router.get('/:id', UsuarioController.buscarPorId);

// Criar novo usuário
router.post('/', UsuarioController.criarUsuario);

// Atualizar usuário
router.put('/:id', UsuarioController.atualizarUsuario);

// Deletar usuário
router.delete('/:id', UsuarioController.deletarUsuario);

// Buscar CEP
router.get('/cep/:cep', UsuarioController.buscarCep);

export default router;
