const connection = require("../Config/database");

exports.login = (req, res) => {
  const { usuario, password } = req.body;
  const query = `SELECT * FROM usuario WHERE usuario = '${usuario}' AND password = '${password}'`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al ejecutar la query:", err);
      res.status(500).send("Error en el servidor");
      return;
    }
    if (results.length === 0) {
      res.status(401).send("Credenciales incorrectas");
      return;
    }
    const user = results[0];
    req.session.user = user;
    res.status(200).json(user);
  });
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.status(200).send("Cierre de sesión exitoso!");
};
