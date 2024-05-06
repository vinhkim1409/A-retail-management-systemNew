const express = require("express");
const router = express.Router();

const MonoController = require("../controllers/testMomoController")
router.post("/payMomo",MonoController.payOrderMomo)

module.exports = router;
