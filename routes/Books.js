const express = require('express');
const appRouter = express.Router();
const con = require('../config/Connection');
const bodyParser = require('body-parser');

appRouter.use(bodyParser.urlencoded({extended:true}));
appRouter.use(bodyParser.json());

//Aqui estoy traendo todas los libros de la barberia con Procedimiento almacenado
let sql= `call usp_listar_books();`

appRouter.get('/books', (req,res)=>{
    con.query(sql,(error, results)=>{
        if (error){
            throw error;
        }
        res.send(results[0]);
    })
})

module.exports=appRouter;