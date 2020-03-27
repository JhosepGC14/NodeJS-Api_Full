const express = require('express');
const app = express()
const cors = require('cors')
app.use(cors());

app.listen('3000',()=>{
    console.log('SERVIDOR EN EJECUCION');
})

//validacion exigira al usuario una url a navegar
app.get('/',(req,res)=>{
    res.send('INGRESA UN URL A NAVEGAR, PORFAVOR')
})

const bookRouter = require('./routes/Books');
app.use('/api', bookRouter);

//validara que la URL exista
app.use((req,res,next)=>{
    const error= new Error("URL NO EXISTE")
    error.status=400;
    next(error);
})

//Mostrara el error que tenga la url
app.use((error, req,res,next)=>{
    res.status(error || 500);
    res.json({
        error : {
            message: error.message
        }
    })
})