const express = require('express');
const cors = require('cors');
const db = require('./db');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// GET: Lista de personas
app.get('/personass', (req, res) => {
    db.query('SELECT * FROM personass', (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// POST: Crear persona
app.post('/personass', (req, res) => {
    const { nombre, edad } = req.body;
    db.query('INSERT INTO personass (nombre, edad) VALUES (?, ?)', [nombre, edad], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ id: result.insertId, nombre, edad });
    });
});

// PUT: Editar persona
app.put('/personass/:id', (req, res) => {
    const { nombre, edad } = req.body;
    const { id } = req.params;
    db.query('UPDATE personass SET nombre = ?, edad = ? WHERE id = ?', [nombre, edad, id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ id, nombre, edad });
    });
});

// DELETE: Eliminar persona
app.delete('/personass/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM personass WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json(err);
        res.json({ id });
    });
});

app.listen(PORT, () => {
    console.log(`Servidor backend escuchando en el puerto ${PORT}`);
});
