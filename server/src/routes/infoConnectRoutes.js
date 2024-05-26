const express = require("express");
const router = express.Router();

const infoConnectController = require("../controllers/infoConnectController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/", authMiddlewares.verifyToken, infoConnectController.getInfoConnect);
router.put("/", authMiddlewares.verifyToken, infoConnectController.updateInfoConnect);
router.get("/all", authMiddlewares.verifyToken, infoConnectController.getAllInfoConnects);

module.exports = router;