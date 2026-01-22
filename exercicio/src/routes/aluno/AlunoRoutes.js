import express from 'express'
import { AlunosController } from '../../controllers/aluno/AlunoControllers.js'



const router = express.Router()


router.get('/', AlunosController.listarAlunos);


router.get('/:id', AlunosController.buscaPorId)


router.post('/', AlunosController.criarAlunos)

router.put('/:id', AlunosController.atualizarAluno)

router.delete('/:id', AlunosController.deletarAluno)


export default router