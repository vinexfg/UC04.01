import { UsuarioModel } from "../models/UsuarioMdeols.js";
import axios from "axios"

export class UsuarioController{
    static listarUsuario(req, res){
        try{
            const usuarios = UsuarioModel.listarUsuario();
            if(!usuarios || usuarios.length === 0){
                res.status(404).json({msg: "nenhum usuario cadastrado"})
                return
            }
            res.status(200).json({msg: " Usuarios encontrado", usuarios})
        }catch(error){
            res.status(500).json({msg: "Erro ao listar usuarios", erro: error.message});

        }
    }
    //funcao assincrona para buscar os dados do viacep

    static async criarUsuario(req,res){
        try {
            const {nome, email, telefone, cep} = req.body;
            if(!nome || !email || !telefone || !cep){
                res.status(400).json({msg: "todos os campos devem ser preenchidos"})
                return
            } 
            const buscarCep = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
            if(buscarCep.erro){
                res.status(400).json({msg: "CEP invalido"})
                return
            }
            console.log(buscarCep)
            const novoUsuario ={
                id: Date.now(),
                nome: nome,
                email: email,
                telefone: telefone,
                cep: cep,
                logradouro: buscarCep.data.logradouro,
                uf: buscarCep.data.uf
            }
            const userCriado = UsuarioModel.criarUsuario(novoUsuario);
            res.status(200).json({msg: "Usuario criado com sucesso!", userCriado});

        } catch (error) {
            res.status(500).json({msg: "Erro interno ao criar o usuario", erro: error.message})
            
        }
    }
}