import { AlunoModel } from "../models/AlunoModel.js";

export class AlunoController {
    static listarAlunos(req, res) {
        try {
            const alunos = AlunoModel.listarAlunos();
            if (alunos.length === 0 || !alunos) {
                res.status(200).json({ msg: "Nenhum aluno cadastrado no banco" });
                return;
            }
            res.status(200).json({ msg: "Alunos encontrados", alunos });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os alunos", erro: error.message });
        }
    }

    static buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "O ID não pode ser vazio" });
                return;
            }
            const aluno = AlunoModel.buscarPorId(id);
            if (!aluno) {
                res.status(404).json({ msg: "Nenhum aluno encontrado com este ID" });
                return;
            }
            res.status(200).json({ msg: "Aluno encontrado com sucesso", aluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno por ID", erro: error.message });
        }
    }

    static criarAluno(req, res) {
        try {
            const { matricula, nome, email, cursoId } = req.body;
            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }

            const matriculaExistente = AlunoModel.buscarPorMatricula(matricula);
            if (matriculaExistente) {
                res.status(400).json({ msg: "Matrícula já cadastrada" });
                return;
            }

            const emailExistente = AlunoModel.buscarPorEmail(email);
            if (emailExistente) {
                res.status(400).json({ msg: "Email já cadastrado" });
                return;
            }

            const novoAluno = AlunoModel.criarAluno(matricula, nome, email, cursoId);
            res.status(201).json({ msg: "Aluno cadastrado com sucesso", aluno: novoAluno });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar o aluno", erro: error.message });
        }
    }

    static atualizarAluno(req, res) {
        try {
            const { id } = req.params;
            const { matricula, nome, email, cursoId } = req.body;
            
            if (!matricula || !nome || !email || !cursoId) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" });
                return;
            }
            
            if (!id) {
                res.status(400).json({ msg: "Nenhum ID fornecido" });
                return;
            }

            const alunoExistente = AlunoModel.buscarPorId(id);
            if (!alunoExistente) {
                res.status(404).json({ msg: "Aluno não encontrado" });
                return;
            }

            const matriculaExistente = AlunoModel.buscarPorMatricula(matricula);
            if (matriculaExistente && matriculaExistente.id !== parseInt(id)) {
                res.status(400).json({ msg: "Matrícula já cadastrada para outro aluno" });
                return;
            }

            const emailExistente = AlunoModel.buscarPorEmail(email);
            if (emailExistente && emailExistente.id !== parseInt(id)) {
                res.status(400).json({ msg: "Email já cadastrado para outro aluno" });
                return;
            }

            const alunoAtualizado = AlunoModel.atualizarAluno(id, matricula, nome, email, cursoId);
            res.status(200).json({ msg: "Aluno atualizado com sucesso", aluno: alunoAtualizado });
        } catch (erro) {
            res.status(500).json({ msg: "Erro interno ao atualizar", erro: erro.message });
        }
    }

    static deletarAluno(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "ID deve ser fornecido" });
                return;
            }
            
            const alunoExistente = AlunoModel.buscarPorId(id);
            if (!alunoExistente) {
                res.status(404).json({ msg: "Aluno não encontrado com este ID" });
                return;
            }

            AlunoModel.deletarAluno(id);
            res.status(200).json({ msg: "Aluno deletado com sucesso" });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao deletar o aluno", erro: error.message });
        }
    }
}
