const mysql = require('mysql');
var  con = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    database: 'barbershop',
});

con.connect((err)=>{
    if(err){
        throw err;
    }
    console.log('CONECTADO A LA BD EXITOSAMENTE...')
})

module.exports = con;