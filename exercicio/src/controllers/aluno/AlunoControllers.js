import { AlunosModel } from "../../models/Aluno/AlunoModel.js";


export class AlunosController{
    static listarAlunos(req, res){
        try{
            const alunos = alunos.listarAlunos()
            if(alunos.length === 0 || !alunos){
                res.status(200).json({msg: "Nenhum alunon encontrado"})
                return
            } 
            } catch(error){
                res.status(500).json({msg: "Erro interno ao lista os alunos", erro: error.message})

            }
        }


        static buscaPorId(req, res){
            try{
                const {id} = req.params
                if(!id){
                    res.status(400).json({msg: "O ID nao pode ser vazio amigo"})
                    return
                }
                const alunos  = AlunosModel.buscaPorId(id);
                if(!alunos){
                    res.status(404).json({msg: "Nenhum aluno encontrado"})
                    return
                }
                res.status(200).json({msg: "aluno encontrado com suceesso", alunos})

            }catch(error){
                res.status(500).json({msg: "Erro interno ao buscar aluno por ID", erro: error.message})
            }
        }

        static criarAlunos(req, res){
            try{
                const{nome, idade, curso, matricula}= req.body;
                if(!nome || !idade || !curso || !matricula){
                    res.status(400).json({msg: "Todos so campos devem ser prenchidos"})
                    return
                }
                if(!id){
                    res.status(400).json({msg: "Aluno nao encontrado"})
                    return
                }

                const alunoNovo = AlunosModel.criarAlunos(nome, idade, curso, matricula)
                res.status(200).json({msg: "Aluno Cadastrado com sucesso" , alunoNovo})

            }catch(error){
                res.status(500).json({msg: "Erro interno ao cadastrar o aluno", erro: error.message})

            }
        }

        static atualizarAluno(req, res){
            try{
                const {id} = req.params
                const {nome, idade, curso, matricula} = req.body
                if(!nome || !idade || !curso || !matricula){
                    res.status(400).json({msg: "Todos os campos devem ser prenchidos"})
                    return
                }
                if(!id){
                    res.status(400).json({msg: "nenhum id encontrado"})
                    return
                }
                const alunoid = AlunosModel.buscaPorId(id)
                if(!alunoid){
                    res.status(404).json({msg: "aluno nao encontrado"})
                    return
                }
                const alunoNovo = AlunosModel.atualizarAluno(id, nome, curso, matricula)
                res.status(201).json({msg: "Aluno criado com sucesso", alunoNovo})
            }catch(erro){
                res.status(500).json({msg: "Erron interno ao atualizar", erro: erro.message})
            }
        }
        
        static deletarAluno(req, res){
            try{
                const {id} = req.params
                if(!id){
                    res.status(400).json({msg: "Id deve ser fornecido"})
                    return
                }
                const delAluno = AlunosModel.deletarAluno(id)
                if(!this.deletarAluno){
                    res.status(404).jsoN({msg: "Aluno nao encotrado com esse id"})
                    return
                }

                res.status(200).json({msg: "Aluno deletado com seucesso"})
            }catch(error){
                req.status(500).json({msg: "erro interno ao deletar o aluno", error: error.message})
            }
        }
    }
