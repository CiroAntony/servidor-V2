const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'qwertyuiop',
  resave: false,
  saveUninitialized: false
}));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Vasquez',
  password: 'MVasquez#19',
  database: 'cticsac',
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar con la BD:', err);
    return;
  }
  console.log('Conexion exitosa!');
});


// Ruta para el manejo de sesiones
app.post('/api/login', (req, res) => {
  const { usuario, password } = req.body;
  const query = `SELECT * FROM usuario WHERE usuario = '${usuario}' AND password = '${password}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al ejecutar la query:', err);
      res.status(500).send('Error en el servidor');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('Credenciales incorrectas');
      return;
    }
    const user = results[0];
    req.session.user = user;
    res.status(200).json(user);
  });
});

// ruta para el manejo de cierre de sesion
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send('Cierro de sesion exitoso!');
});

// middleware para verificar si el usuario ha iniciado sesión
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send('Restringido');
    return;
  }
  next();
};

// Ruta para obtener todas las empresas
app.get('/api/companies', (req, res) => {
  const query = 'SELECT nombre, ruc, direccion, telefono FROM empresa';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener las empresas:', err);
      res.status(500).json({ error: 'Error en el servidor' });
      return;
    }

    res.json(results);
  });
});

// Ruta protegida que requiere inicio de sesión
app.get('/api/protected', requireLogin, (req, res) => {
  res.status(200).send('No puede continuar');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Iniciando servidor en el puerto: ${PORT}`));
