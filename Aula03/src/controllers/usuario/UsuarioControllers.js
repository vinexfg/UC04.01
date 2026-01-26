import { UsuarioModel } from "../../models/usuario/UsuarioModels.js";

export class UsuarioController {
    static listarUsuarios(req, res) {
        try {
            const usuarios = UsuarioModel.listarTodos()
            if (usuarios.length === 0 || !usuarios) {
                res.status(200).json({ msg: "Nenhum usuário no banco" })
                return
            }
            res.status(200).json({ msg: "Usuários encontrados", usuarios })
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao listar os usuários", erro: error.message })
        }
    }



    static buscarPorId(req, res) {
        try {
            const { id } = req.params;
            if (!id) {
                res.status(400).json({ msg: "O id não pode ser vazio" });
                return;
            }
            const usuario = UsuarioModel.buscarPorId(id);
            if (!usuario) {
                res.status(404).json({ msg: "Nenhum usuário com este ID" });
                return;
            }
            res.status(200).json({ msg: "Usuário encontrado", usuario });
        } catch (error) {
            res.status(500).json({ msg: "Erro interno ao buscar usuário por ID", erro: error.message });
        }
    }

    static criarUsuario(req, res){
        try{
            const {nome, email, telefone}= req.body;
            if(!nome || !email || !telefone){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos no cadastro"})
                return;
            }
            const novoUsuario = UsuarioModel.criarUsuario(nome, email, telefone);
            res.status(200).json({msg: "Usuário criado com sucesso!", novoUsuario})
        }
        catch(erro){
            res.status(500).json({msg: "Erro interno ao cadastrar usuario", erro: erro.message})
        }
    }

    static atualizarUsuario(req, res){
        try{
            const {id} = req.params
            const{nome, email, telefone} = req.body;
            if(!nome || !email || !telefone){
                res.status(400).json({msg: "Todos os campos devem ser preenchidos na atualização"})
                return
            }

            if(!id){
                res.status(400).json({msg: "Nenhum ID fornecido na atualização"})
                return
            }

            const usuarioId = UsuarioModel.buscarPorId(id)
            if(!usuarioId){
                res.status(404).json({msg: "Usuário não encontrado"})
                return
            }
            const novoUsuario = UsuarioModel.atualizarUsuario(id,nome,email, telefone)
            res.status(201).json({msg: "Usuario atualizado com sucesso", novoUsuario})
        } catch(erro){
            res.status(500).json({msg: "Erro interno ao atualizar", erro: erro.message})
        }
    }


    static deletarUsuario(req, res){
        try{
            const {id} = req.params
            if(!id){
                res.status(400).json({msg: "ID deve ser fornecido"})
                return
            }
            const delUsuario = UsuarioModel.deletarUsuario(id);
            if(!delUsuario){
                res.status(404).json({msg: "Usuário não encontrado com este ID"})
                return
            }
            res.status(200).json({msg: "Usuario deletado com sucesso"})
        }catch(error){
            res.status(500).json({msg: "erro interno ao deletar o usuario", error: error.message});
        }
    }

    static buscarPorEmail(req, res){
        try{
            const {email} = req.params
            if(!email){
                res.status(400).json({msg: "Email deve ser fornecido"})
                return
            }
            const usuario = UsuarioModel.buscarPorEmail(email)
            if(!usuario){
                res.status(404).json({msg: "Nenhum usuário encontrado com este email"})
                return
            }
            res.status(200).json({msg: "Usuário encontrado", usuario})
        } catch(error){
            res.status(500).json({msg: "Erro interno ao buscar por email", erro: error.message})
        }
    }
}

