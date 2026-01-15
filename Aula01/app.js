import express from "express";

const app = express();
const port = 3000;


// Banco de dados em memoria

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
