import express from "express"

import AlunoRoutes from "./src/routes/alunos/AlunoRoutes.json"


const app = express()
app.use(express.json())
const PORT = 3000

app.get('/', (req, res)=>{
    res.status(200).json("hello world")
})

app.use()

app.listen(PORT, ()=>{
    console.log(`Aplicacao rodadno em http://localhost:${PORT}`)
})


