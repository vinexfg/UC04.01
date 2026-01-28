import { CursoModel } from "../models/CursoModel";

export class CursoController {
    static listarCurso(req, res) {
        try {
            const cursos = CursoModel.listarCursos();
            if (cursos.length === 0 || !cursos) {
                res.status(400).json({ msg: "Nenhum curso cadastrado no banco" });
                return;
            }
            res.status(200).json({ msg: "Cursos encontrados.", cursos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os cursos", erro: error.message });
        }
    }

    static buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const curso = CursoModel.buscarPorId(id);
            if (!curso) {
                res.status(404).json({ msg: "Curso não encontrado" });
                return;
            }
            res.status(200).json({ msg: "Curso encontrado.", curso });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar o curso", erro: error.message });
        }
    }

    static criarCurso(req, res) {
        try {
            const { nome } = req.body;
            if (!nome) {
                res.status(400).json({ msg: "Nome do curso é obrigatório" });
                return;
            }
            const cursos = CursoModel.listarCursos();
            const buscarCurso = cursos.find(c => c.nome.toLowerCase() === nome.toLowerCase());
            if (buscarCurso) {
                res.status(400).json({ msg: "Curso já existente" });
                return;
            }
            const novoCurso = CursoModel.criarCurso(nome);
            res.status(201).json({ msg: "Curso criado com sucesso.", curso: novoCurso });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao criar o curso", erro: error.message });
        }
    }

    static atualizarCurso(req, res) {
        try {
            const { id } = req.params;
            const { nome } = req.body;
            if (!nome) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }
            const cursos = CursoModel.listarCursos();
            const buscarCurso = cursos.find(c => c.nome.toLowerCase() === nome.toLowerCase() && c.id !== parseInt(id));
            if (buscarCurso) {
                res.status(400).json({ msg: "Já existe outro curso com esse nome" });
                return;
            }
            const cursoAtualizado = CursoModel.atualizarCurso(id, nome);
            if (!cursoAtualizado) {
                res.status(404).json({ msg: "Curso não encontrado" });
                return;
            }
            res.status(200).json({ msg: "Curso atualizado com sucesso.", curso: cursoAtualizado });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao atualizar o curso", erro: error.message });
        }
    }

    static deletarCurso(req, res) {
        try {
            const { id } = req.params;
            const cursoDeletado = CursoModel.deletarCurso(id);
            if (!cursoDeletado) {
                res.status(404).json({ msg: "Curso não encontrado" });
                return;
            }
            res.status(200).json({ msg: "Curso deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno no servidor", erro: error.message });
        }
    }

    static buscarAlunoPorCurso(req, res) {
        try {
            const { idCurso } = req.params;
            const curso = CursoModel.buscarPorId(idCurso);
            if (!curso) {
                res.status(404).json({ msg: "Curso não encontrado" });
                return;
            }
            const alunos = CursoModel.listarAlunosPorCurso(idCurso);
            if (alunos.length === 0) {
                res.status(404).json({ msg: "Nenhum aluno encontrado para este curso" });
                return;
            }
            res.status(200).json({ msg: "Alunos encontrados.", alunos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar alunos do curso", erro: error.message });
        }
    }
    
}