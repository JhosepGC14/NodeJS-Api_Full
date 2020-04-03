const express = require('express');
const appRouter = express.Router();
const con = require('../config/Connection');
const bodyParser = require('body-parser');

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.use(bodyParser.json());

//Aqui estoy trayendo todas los libros de la barberia con Procedimiento almacenado desde Mysql
let sql = `call usp_listar_books();`;
let usp_post = `call usp_insertar_books(?,?,?);`;
let usp_delete = `call usp_delete_books(?);`;
let usp_search = `call usp_search_books(?);`;
let usp_update = `call usp_modificar_books(?,?,?,?)`;

//ENDPOINT DE GET PARA LISTAR TODA LA TABLA
appRouter.get('/books', (req, res) => {
    con.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results[0]);
    });
});

//ENDPOINT DE PUT PARA MODIFICAR O ACTUALIZAR
appRouter.put('/books', (req, res)=>{
    const book={
        codigo:req.body.id_book,
        title:req.body.book_title,
        autor:req.body.book_author,
        publicado:req.body.book_published,
    }
    con.query(usp_update, [book.codigo,book.title, book.autor, book.publicado], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
        console.log("REGISTRO SE MODIFICO CORRECTAMENTE")
    });
})


//ENDPOINT DE POST
appRouter.post('/books', (req, res) => {
    const book = {
        title: req.body.book_title,
        autor: req.body.book_author,
        publicado: req.body.book_published,
    }
    con.query(usp_post, [book.title, book.autor, book.publicado], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
        console.log("REGISTRO INSERTADO CORRECTAMENTE")
    });
});


//ENDPOINT PARA ELIMINAR DATO POR ID (EN POSTMAN TENGO QUE ENVIAR KEY_ID)
appRouter.delete('/books/:id_book', (req, res) => {
    const borrar = {
        codigo: req.params.id_book,
    }
    con.query(usp_delete, [borrar.codigo], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results[0]);
        console.log("REGISTRO ELIMINADO CORRECTAMENTE")
    });
});

//ENDPOINT PARA BUSQUEDA POR ID 
appRouter.get('/books/:id_book', (req, res) => {
    const search = {
        codigo: req.params.id_book,
    }
    con.query(usp_search, [search.codigo], (error, results, fields) => {
        if (error) {
            throw error;
        }
        res.send(results[0]);
        console.log("RESULTADOS DE BUSQUEDA POR ID EXITOSO");
    });
});

module.exports = appRouter;