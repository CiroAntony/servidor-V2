const connection = require("../Config/database");

exports.getAllUsuarios = (req, res) => {
  const query = "SELECT * FROM usuario";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener la lista de empleados:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    res.json(results);
  });
};

exports.createUsuario = (req, res) => {
  const { usuario, password, nombres, apellidos, correo, telefono, id_rol } =
    req.body;
  const imagenPath = req.file.path;

  const imagenData = fs.readFileSync(imagenPath);

  const query = `INSERT INTO usuario (usuario, password, nombres, apellidos, correo, telefono, id_rol, imagen) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    usuario,
    password,
    nombres,
    apellidos,
    correo,
    telefono,
    id_rol,
    imagenData,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error("Error al crear el empleado:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    fs.unlinkSync(imagenPath);

    res.status(201).json({ message: "Empleado creado exitosamente" });
  });
};

exports.getUsuarioImagen = (req, res) => {
  const { id } = req.params;
  const query = `SELECT imagen FROM usuario WHERE id_usuario = ${id}`;

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener la imagen:", err);
      res.status(500).json({ error: "Error en el servidor" });
      return;
    }

    if (results.length === 0 || !results[0].imagen) {
      res.status(404).json({ error: "No se encontró la imagen" });
      return;
    }

    const image = results[0].imagen;
    res.writeHead(200, {
      "Content-Type": "image/jpeg",
      "Content-Length": image.length,
    });
    res.end(image);
  });
};
