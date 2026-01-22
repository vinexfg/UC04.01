import { alunos } from "../../data/banco.js";


export class AlunosModel{
    static listarTods(){
        return alunos
    }

    static buscarPorid(id){
        return alunos.find(a => a.id === parseInt(id))
    }

    static criarAluno(nome, idade, curso, matricula){
        const novoAluno ={
            id: alunos.length + 1,
            nome: nome,
            idade: idade,
            curso: curso,
            matricula: matricula
        }
        alunos.push(novoAluno)
    }

    static atualizarAluno(id, nome, idade, curso, matricula){
        const index = alunos.findIndex(a => a.id === parseInt(id))
        alunos[index] ={
            id: parseInt(id),
            nome: nome,
            idade: idade,
            curso: curso,
            matricula: matricula
        }
        return alunos[index]
    }

    static deletarAluno(id){
        const index = alunos.findIndex(a => a.id === parseInt(id))
        alunos.splice(index, 1)
        return true
    }
    static buscarPorMatricula(matricula){
        return alunos.find(a => a.matricula === matricula)
    }
}