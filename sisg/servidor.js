const express = require('express');
const cors = require('cors');
const connection = require('./basedatos');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }
        res.json(results);
    });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        res.status(400).json({ success: false, message: 'Username y password son requeridos' });
        return;
    }

    connection.query('SELECT * FROM usuarios WHERE username = ?', [username], (err, results) => {
        if (err) {
            res.status(500).send('Error en la base de datos');
            return;
        }

        if (results.length === 0) {
            res.json({ success: false, message: 'Usuario no encontrado' });
            return;
        }

        const user = results[0];

        if (password === user.password) {
            res.json({ success: true, message: 'Login exitoso' });
        } else {
            res.json({ success: false, message: 'Contraseña incorrecta' });
        }
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
