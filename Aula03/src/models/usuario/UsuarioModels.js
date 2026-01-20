 import {usuarios} from "../../data/banco.js"

 
 export class UsuarioModel{

    static listarTodos(){
        return usuarios;
    }
    static buscarPorId(id){
        return usuarios.find(u => u.id === parseInt(id))
    }
    static criarUsuario(nome, email, telefone){
        const novoUsuario = {
            id: usuarios.length + 1,
            nome: nome,
            email: email,
            telefone: telefone,
        };
        usuarios.push(novoUsuario)
        return novoUsuario
    }
    static atualizarUsuario(id, nome, email, telefone){
           const index = usuarios.findIndex(u => u.id === parseInt(id))
           usuarios[index] = {
            id: parseInt(id),
            nome: nome,
            emial: email,
            telefone: telefone,
           }
           return usuarios[index]
    }
    static deletarUsuario(id){
        const index = usuarios.findIndex(u => u.id === parseInt(id))
        usuarios.splice(index, 1);
        return true
    }

    static buscarPorId(req, re){
        try{
            const {id} = req.params;
            if(!id){
                res.status(404).json({msg: "O id nao pode ser vazio"})
                return
            }
            const usuario = UsuarioModel.buscarPorId(id)
            if(!usuario){
                res.status(404).json({msg: " nenhum usuario com esse ID"})
                return
            }  
            res.status(200).json({msg: "usuario encontrado", usuario}) 
        } catch(error){
            res.status(500).json({msg: "erro interno ao buscar usuario por ID", erro: error.message})
        }
    }
}