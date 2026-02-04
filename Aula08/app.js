import express, { json } from "express";
import "dotenv/config";
import usuariosRoutes from "./src/routes/usuariosRoutes.js";


const app = express()
const PORT = process.env.PORT || 3000


app.use(express.json())

// Rotas
app.use('/api', usuariosRoutes);

app.get('/', (req,res)=>{
    res.status(200).json({msg: "API rodando"})
})


app.listen(PORT, ()=>{
    console.log(`Aplicação rodando em http://localhost:${PORT}`);
    
})