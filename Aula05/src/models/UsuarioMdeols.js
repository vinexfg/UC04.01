import { usuarios } from '../data/usuarios.js';

export class UsuarioModel{
    static listarUsuario(){
        return usuarios
    }
    static buscarPorId(id){
        return usuarios.find(u => u.id === parseInt(id));

    }
    static criarUsuario(novoUsuario){
        usuarios.push(novoUsuario);
        return novoUsuario
    }

    static atualizarUsuario(id, novosDados){
        const index = usuarios.findIndex(u=> u.id === parseInt(id));
        if (index !== -1) {
            novosDados[index] = { ...usuarios[index], ...novosDados };
            return novosDados[index];
        }
        return null;
    }

    static deletarUsuario(){
        const index = usuarios.findIndex(u => u.id === parseInt(id))
        if(index === -1){
            return false
        }
        usuarios.splice(index, 1)
        return true
    }
}