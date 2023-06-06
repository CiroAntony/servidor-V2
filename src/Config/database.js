const mysql = require("mysql");

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: "localhost",
  user: "Vasquez",
  password: "MVasquez#19",
  database: "cticsac",
  port: 3306,
});

connection.connect((err) => {
  if (err) {
    console.error("Error al conectar con la BD:", err);
    return;
  }
  console.log("Conexión exitosa!");
});

module.exports = connection;
