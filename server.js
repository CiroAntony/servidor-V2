const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const session = require('express-session');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: false
}));

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Vasquez',
  password: 'MVasquez#19',
  database: 'cticDB',
  port: 3307
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to database!');
});

//Ruta para el manejo de sesiones
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).send('Internal server error');
      return;
    }
    if (results.length === 0) {
      res.status(401).send('Invalid credentials');
      return;
    }
    req.session.user = { username };
    res.status(200).send('Login successful');
  });
});

// ruta para el manejo de cierre de sesion
app.post('/api/logout', (req, res) => {
  req.session.destroy();
  res.status(200).send('Logout successful');
});

// middleware para verificar si el usuario ha iniciado sesión
const requireLogin = (req, res, next) => {
  if (!req.session.user) {
    res.status(401).send('Unauthorized');
    return;
  }
  next();
};

// Ruta protegida que requiere inicio de sesión
app.get('/api/protected', requireLogin, (req, res) => {
  res.status(200).send('Protected content');
});

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
