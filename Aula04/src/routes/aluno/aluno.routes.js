import express from 'express';
import { AlunoController } from '../../controllers/AlunoController.js';

const router = express.Router();

// Rota para listar todos os alunos
router.get('/', AlunoController.listarAlunos);

// Rota para buscar aluno por ID
router.get('/:id', AlunoController.buscarPorId);

// Rota para criar um novo aluno
router.post('/', AlunoController.criarAluno);

// Rota para atualizar aluno
router.put('/:id', AlunoController.atualizarAluno);

// Rota para deletar aluno
router.delete('/:id', AlunoController.deletarAluno);

export default router;
