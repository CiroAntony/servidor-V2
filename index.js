const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const session = require("express-session");
const multer = require("multer");

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.use(
  session({
    secret: "qwertyuiop",
    resave: false,
    saveUninitialized: false,
  })
);

// Conexión a la base de datos
const connection = require("./src/Config/database");

// Configuración de almacenamiento de archivos con multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Rutas
const authRoutes = require("./src/Routes/AuthRoutes");
const empresaRoutes = require("./src/Routes/EmpresaRoutes");
const usuarioRoutes = require("./src/Routes/UsuarioRoutes");

app.use("/api", authRoutes);
app.use("/api", empresaRoutes);
app.use("/api", usuarioRoutes);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Iniciando servidor en el puerto: ${PORT}`));
