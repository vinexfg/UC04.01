import express from "express";

const app = express();
const port = 3000;

app.use(express.json());

// Banco de dados em memória
let Usuarios = [
    {
        id: 1,
        nome: "Vinicius",
        email: "vinisilvas23@contato.com",
        telefone: "(84)99822-1121"
    },
    {
        id: 2,
        nome: "Vinicius Almeida",
        email: "viniciusgoncalves@almeida.com",
        telefone: "(84)99855-4343"
    }
];

// GET todos
app.get("/api/usuarios", (req, res) => {
    res.status(200).json(Usuarios);
});

// GET por ID
app.get("/api/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const usuario = Usuarios.find(u => u.id === id);

    if (!usuario) {
        return res.status(404).json({ msg: "Nenhum usuário encontrado" });
    }

    res.status(200).json(usuario);
});

// POST
app.post("/api/usuarios", (req, res) => {
    const { nome, email, telefone } = req.body;

    if (!nome || !email || !telefone) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    const novoUsuario = {
        id: Usuarios.length + 1,
        nome,
        email,
        telefone
    };

    Usuarios.push(novoUsuario);

    res.status(201).json({
        msg: "Usuário criado com sucesso",
        usuario: novoUsuario
    });
});

// PUT
app.put("/api/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const { nome, email, telefone } = req.body;

    const index = Usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    if (!nome || !email || !telefone) {
        return res.status(400).json({ msg: "Todos os campos são obrigatórios" });
    }

    Usuarios[index] = {
        id,
        nome,
        email,
        telefone
    };

    res.status(200).json({
        msg: "Usuário atualizado com sucesso",
        usuario: Usuarios[index]
    });
});


app.delete("/api/usuarios/:id", (req, res) => {
    const id = Number(req.params.id);
    const index = Usuarios.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ msg: "Usuário não encontrado" });
    }

    Usuarios.splice(index, 1);

    res.status(200).json({ msg: "Usuário removido com sucesso" });
});


app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
