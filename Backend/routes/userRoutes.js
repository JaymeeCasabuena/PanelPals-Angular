const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/:id", authMiddleware, userController.deleteUser);
router.put("/:id", authMiddleware, userController.editUserDetails);
router.get("/current", authMiddleware, userController.getCurrentUser);

module.exports = router;
