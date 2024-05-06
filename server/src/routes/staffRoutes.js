const express = require("express");
const router = express.Router();

//load model
const Staff = require("../models/staffModel");
const staffController = require("../controllers/staffController");
const authMiddlewares = require("../middlewares/authMiddlewares");

router.get("/", authMiddlewares.verifyToken, staffController.getAllStaff);
router.post("/add", authMiddlewares.verifyToken, staffController.addNewStaff);
router.put(
  "/delete/:id",
  authMiddlewares.verifyToken,
  authMiddlewares.verifyAdminAuth,
  staffController.deleteStaff
);
router.put(
  "/update/:id",
  authMiddlewares.verifyToken,
  authMiddlewares.verifyAdminAuth,
  staffController.updateStaff
);
router.get("/:id", authMiddlewares.verifyToken, staffController.getOneStaff);

module.exports = router;
