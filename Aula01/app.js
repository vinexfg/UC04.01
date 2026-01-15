import express from "express";

const app = express();
const port = 3000;



app.use(express.json())

// Banco de dados em memoria
let Usuarios = [
    {
        id:1,
        nome: "Vinicius",
        email: ' Vinisilvas23@contato.com',
        telefone: "(84)99822-1121" 
    },
    {
        id:2,
        nome: 'Vinicius Almeida',
        email: "viniciusgoncalves@.almeida.com",
        telefone: "(84)99855-4343"
    }
]


app.get('/api/usuarios', (req, res) =>{
    res.status(200).json({"Usuarios": Usuarios})
})

app.get('/api/usuarios/:id', (req, res)=>{
    const {id} = req.params;
    const usuario = Usuarios.find(u => u.id === parseInt(id));
    if(!usuario){
        res.status(404).json({"msg": "Nenhum Usuario encontrado"})
        return
    }
    res.status(200).json({"msg": "Usuario encontrado.", usuario})
})








app.post('/api/usuarios', (req, res)=> {
    const {nome, email, telefone } = req.body;
    if(!nome || !email || !telefone){
        res.status(400).json({"msg": "todos os campos  sao obrigadatorios"})
        return
    }

    const novoUsuario = {
        id:Usuarios.length + 1,
        nome: nome,
        email: email,
        telefone: telefone,        
    }
    Usuarios.push(novoUsuario)

    res.status(201).json({
        'msg': 'Usuario criado com sucesso',
        "usuario": "novoUsuario",
        
    }
    )
})


app.put('/api/usuario/:id', (req, res)=>{
    const {id} = req.params;
    const {nome, email, telefone} = req.body
    if(!nome || !email || !telefone){
        res.status(400).json({"msg": 'NEnhum usuario encontrado com este id'})
        return
    }
    const index = Usuarios.findIndex(u => u.id === parseInt(id));
    if(index === -1){
        res.status(404).json({"msg": "Nenhum usuario encontrado "})
    }
    usuario[index] = {
        id: id,
        nome: nome,
        email: email
    }
    res.status(200).json({"msg": "usuario atualizado com sucesso",
        "usuario": usuarios[index]
    })
})




app.get('/', (req, res) => {
    res.send("Hello World!!");
});


app.get('/Teste', (req, res)=> {
    res.status(200).send('Teste')
})

app.get('/Usuario', (req, res) => {
    res.json({
        nome: "Vini",
        idade: 25,
        cidade: "RN"
    });
});

app.get('/Livro', (req, res)=>{
    res.json({
        Livro: "Dante",
        Paginas: 899,
        Author: "casaBahia"
    })
})

app.get('/status', (req, res) => {
    res.status(200).send("tudo ok!");
});

app.get('/erro', (req, res) =>{
    res.status(500).json({
        erro: "erro interno do servidor"
    })
})

app.get('/usuario/:id', (req, res)=> {
    const {id} = req.params;
    res.status(200).json({
        id: id,
        nome: "User exemplo"
    })
})

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
