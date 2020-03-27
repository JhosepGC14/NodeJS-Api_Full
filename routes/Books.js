const express = require('express');
const appRouter = express.Router();
const con = require('../config/Connection');
const bodyParser = require('body-parser');

appRouter.use(bodyParser.urlencoded({ extended: true }));
appRouter.use(bodyParser.json());

//Aqui estoy traendo todas los libros de la barberia con Procedimiento almacenado
let sql = `call usp_listar_books();`;
let usp_post = `call usp_insertar_books(?,?,?);`;
let usp_delete = `call usp_delete_books(?);`;

//endpoint GET
appRouter.get('/books', (req, res) => {
    con.query(sql, (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results[0]);
    });
});

//endpoint POST
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
    });
});


//endpoint para eliminar datos de la tabla
appRouter.delete('/books', (req, res) => {
    const borrar = {
        codigo: req.body.id_book,
    }
    con.query(usp_delete, [borrar.codigo], (error, results) => {
        if (error) {
            throw error;
        }
        res.send(results);
        console.log("REGISTRO ELIMINADO CORRECTAMENTE")
    });
});


module.exports = appRouter;