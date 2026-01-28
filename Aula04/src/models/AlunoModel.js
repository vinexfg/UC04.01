import { alunos } from "../data/alunos.data.js";

export class AlunoModel {
    static listarAlunos() {
        return alunos;
    }

    static buscarPorId(id) {
        return alunos.find(a => a.id === parseInt(id));
    }

    static buscarPorMatricula(matricula) {
        return alunos.find(a => a.matricula === matricula);
    }

    static buscarPorEmail(email) {
        return alunos.find(a => a.email === email);
    }

    static criarAluno(matricula, nome, email, cursoId) {
        const novoAluno = {
            id: alunos.length + 1,
            matricula,
            nome,
            email,
            cursoId: parseInt(cursoId)
        };
        alunos.push(novoAluno);
        return novoAluno;
    }

    static atualizarAluno(id, matricula, nome, email, cursoId) {
        const index = alunos.findIndex(a => a.id === parseInt(id));
        alunos[index] = {
            id: parseInt(id),
            matricula,
            nome,
            email,
            cursoId: parseInt(cursoId)
        };
        return alunos[index];
    }

    static deletarAluno(id) {
        const index = alunos.findIndex(a => a.id === parseInt(id));
        alunos.splice(index, 1);
        return true;
    }
}
