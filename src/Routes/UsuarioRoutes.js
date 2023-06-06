const express = require("express");
const router = express.Router();
const usuarioController = require("../Controller/UsuarioController");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.get("/usuario", usuarioController.getAllUsuarios);
router.post(
  "/usuario",
  upload.single("imagen"),
  usuarioController.createUsuario
);
router.get("/usuario/:id/imagen", usuarioController.getUsuarioImagen);

module.exports = router;
