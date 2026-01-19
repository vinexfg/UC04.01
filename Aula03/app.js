import express from "express"


const app = express()
const PORT = 3000

app.get('/', (req, res)=>{
    res.status(200).send(" hello worldd")
})




app.listen(PORT, ()=>{
    console.log(`aplicacao rodadno em http://localhost:${PORT}`)
})