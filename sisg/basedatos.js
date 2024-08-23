const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'sisg'
});

connection.connect((err) => {
    if(err){
        console.error('Error en la conexion en la base de datos', err);
    }
    console.log('Conexion exitosa');
})

module.exports = connection;