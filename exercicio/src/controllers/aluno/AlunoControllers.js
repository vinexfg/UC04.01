import { AlunosModel } from "../../models/Aluno/AlunoModels.js";


export class AlunosController {
    static listarAlunos(req, res) {
        try {
            const alunos = AlunosModel.listarAlunos()
            if (alunos.length === 0 || !alunos) {
                res.status(200).json({ msg: "Nenhum aluno encontrado" })
                return
            }
            res.status(200).json({ msg: "Alunos listados com sucesso", alunos })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao lista os alunos", erro: error.message })

        }
    }


    static buscaPorId(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ msg: "O ID nao pode ser vazio amigo" })
                return
            }
            const alunos = AlunosModel.buscaPorId(id);
            if (!alunos) {
                res.status(404).json({ msg: "Nenhum aluno encontrado" })
                return
            }
            res.status(200).json({ msg: "aluno encontrado com sucesso", alunos })

        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar aluno por ID", erro: error.message })
        }
    }

    static criarAlunos(req, res) {
        try {
            const { nome, idade, curso, matricula } = req.body;
            if (!nome || !idade || !curso || !matricula) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
                return
            }

            const matriculaExistente = AlunosModel.buscarPorMatricula(matricula)
            if (matriculaExistente) {
                res.status(404).json({ msg: "Matricula ja cadastrada" })
                return
            }

            const alunoNovo = AlunosModel.criarAlunos(nome, idade, curso, matricula)
            res.status(201).json({ msg: "Aluno Cadastrado com sucesso", alunoNovo })

        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao cadastrar o aluno", erro: error.message })

        }
    }

    static atualizarAluno(req, res) {
        try {
            const { id } = req.params
            const { nome, idade, curso, matricula } = req.body
            if (!nome || !idade || !curso || !matricula) {
                res.status(400).json({ msg: "Todos os campos devem ser preenchidos" })
                return
            }
            if (!id) {
                res.status(404).json({ msg: "nenhum id encontrado" })
                return
            }
            const alunoid = AlunosModel.buscaPorId(id)
            if (!alunoid) {
                res.status(404).json({ msg: "aluno nao encontrado" })
                return
            }
            const matriculaExistente = AlunosModel.buscarPorMatricula(matricula)
            if (matriculaExistente && matriculaExistente.id !== parseInt(id)) {
                res.status(400).json({ msg: "Matricula ja cadastrada para outro aluno" })
                return
            }
            const alunoNovo = AlunosModel.atualizarAluno(id, nome, idade, curso, matricula)
            res.status(200).json({ msg: "Aluno atualizado com sucesso", alunoNovo })
        } catch (erro) {
            res.status(500).json({ msg: "Erro interno ao atualizar", erro: erro.message })
        }
    }

    static deletarAluno(req, res) {
        try {
            const { id } = req.params
            if (!id) {
                res.status(400).json({ msg: "Id deve ser fornecido" })
                return
            }
            const delAluno = AlunosModel.deletarAluno(id)
            if (!delAluno) {
                res.status(404).json({ msg: "Aluno nao encontrado com esse id" })
                return
            }

            res.status(200).json({ msg: "Aluno deletado com sucesso" })
        } catch (error) {
            res.status(500).json({ msg: "erro interno ao deletar o aluno", error: error.message })
        }
    }
}
