const express = require("express");
const router = express.Router();
const empresaController = require("../Controller/EmpresaController");

router.get("/companies", empresaController.getAllCompanies);
router.post("/companies", empresaController.createCompany);

module.exports = router;
