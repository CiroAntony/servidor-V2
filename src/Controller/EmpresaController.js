const connection = require("../Config/database");

exports.getAllCompanies = (req, res) => {
  const query = "SELECT nombre, ruc, direccion, telefono FROM empresa";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener las empresas:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    res.json(results);
  });
};

exports.createCompany = (req, res) => {
  const { nombre, ruc, direccion, telefono } = req.body;
  const query = `INSERT INTO empresa (nombre, ruc, direccion, telefono) VALUES ('${nombre}', '${ruc}', '${direccion}', '${telefono}')`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al crear la empresa:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    res.status(201).json({ message: "Empresa creada exitosamente" });
  });
};
