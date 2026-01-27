import express from 'express';
import { CursoController } from '../../controllers/CursoController';

const router = express.Router();

router.get('/', CursoController.listarCurso);

export default router;
