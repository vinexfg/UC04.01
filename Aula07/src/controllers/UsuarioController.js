import {UsuarioModel} from "../models/UsuarioModel.js"
import bcrypt from "bcrypt";
import {v4 as uuidv4} from "uuid";



export class UsuarioController{
    static listarUsuarios(req, res){
        try{
            const usuarios = UsuarioModel.listarUsuario();
            res.status(200).json(usuarios);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static buscarUsuarioPorId(req, res){
        try{
            const {id} = req.params;
            const usuario = UsuarioModel.buscarPorId(id);
            if(!usuario){
                return res.status(404).json({error: "Usuário não encontrado"});
            }
            res.status(200).json(usuario);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static criarUsuario(req, res){
        try{
            const {nome, email, senha} = req.body;
            
            if(!nome || !email || !senha){
                return res.status(400).json({error: "Nome, email e senha são obrigatórios"});
            }

            const senhaHash = bcrypt.hashSync(senha, 10);
            const novoUsuario = {
                id: uuidv4(),
                nome,
                email,
                senha: senhaHash
            };

            const usuarioCriado = UsuarioModel.criarUsuario(novoUsuario);
            res.status(201).json(usuarioCriado);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static atualizarUsuario(req, res){
        try{
            const {id} = req.params;
            const {nome, email, senha} = req.body;
            
            const novosDados = {};
            if(nome) novosDados.nome = nome;
            if(email) novosDados.email = email;
            if(senha) novosDados.senha = bcrypt.hashSync(senha, 10);

            const usuarioAtualizado = UsuarioModel.atualizarUsuario(id, novosDados);
            
            if(!usuarioAtualizado){
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            res.status(200).json(usuarioAtualizado);
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static deletarUsuario(req, res){
        try{
            const {id} = req.params;
            const deletado = UsuarioModel.deletarUsuario(id);
            
            if(!deletado){
                return res.status(404).json({error: "Usuário não encontrado"});
            }

            res.status(200).json({message: "Usuário deletado com sucesso"});
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static login(req, res){
        try{
            const {email, senha} = req.body;
            
            if(!email || !senha){
                return res.status(400).json({error: "Email e senha tem que ser digitado"});
            }

            const usuario = UsuarioModel.buscarPorEmail(email);
            
            if(!usuario){
                return res.status(400).json({error: "Email ou senha errado"});
            }

            const senhaValida = bcrypt.compareSync(senha, usuario.senha);
            
            if(!senhaValida){
                return res.status(400).json({error: "Email ou senha incorreto"});
            }

            res.status(200).json({
                message: "Login realizado",
                usuario: {
                    id: usuario.id,
                    nome: usuario.nome,
                    email: usuario.email
                }
            });
        } catch(error){
            res.status(500).json({error: error.message});
        }
    }

    static buscarPorId(req, res){
        try {
            const {id} = req.params
            const usuario = UsuarioModel.buscarPorId(id)
            if(!usuario){
                res.status(400).json({msg: "nenhum usuario encontrado com esse ID"})
                return
            }
            res.status(200).json({msg: "Usuario encontrado", usuario})
        } catch (error) {
            res.status(500).json({msg: "Erro interno ao buscar ousuario por id", erro: error.message})
            
        }
    }

    static deletarUser(req,res){
        try{
            const {id} = req.params
            const usuario = UsuarioModel.deletarUsuario(id)
            if(!usuario){
                res.status(404).json({msg: "Memhu, usuario encontrado com esse ID"})
                return
            }
            res.status(200).json({msg: "suaurio deletado com sucesso"})
        }catch(error){
            res.status(500).json({msg: "Erro interno ao deletar usuario!", erro: error.message})
        }
    }
}