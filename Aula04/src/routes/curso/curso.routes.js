import express from 'express';
import { CursoController } from '../../controllers/CursoController.js';

const router = express.Router();

router.get('/', CursoController.listarCurso);
router.get('/:id', CursoController.buscarPorId);
router.post('/', CursoController.criarCurso);
router.put('/:id', CursoController.atualizarCurso);
router.delete('/:id', CursoController.deletarCurso);
router.get('/:idCurso/alunos', CursoController.buscarAlunoPorCurso);

export default router;
