import express from "express"

import AlunoRoutes from "./routes/aluno/AlunoRoutes.js"


const app = express()
app.use(express.json())
const PORT = 3000

app.get('/', (req, res)=>{
    res.status(200).json("hello world")
})

app.use('/alunos', AlunoRoutes)

app.listen(PORT, ()=>{
    console.log(`Aplicacao rodadno em http://localhost:${PORT}`)
})


