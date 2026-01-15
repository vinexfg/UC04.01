import express from "express";

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send("Hello World!!");
});

app.get('/Usuario', (req, res) => {
    res.json({
        nome: "Vini",
        idade: 25,
        cidade: "RN"
    });
});

app.get('/status', (req, res) => {
    res.status(200).send("tudo ok!");
});

app.get('/erro', (req, res) =>{
    res.status(500).json({
        erro: "erro interno do servidor"
    })
})

app.get('/usuario/:id')

app.listen(port, () => {
    console.log(`Aplicação rodando em http://localhost:${port}`);
});
