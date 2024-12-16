const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.registerUser);
router.post("/login", userController.loginUser);
router.delete("/:id", userController.deleteUser);
router.put("/:id", userController.editUserDetails);
router.get("/current", userController.getCurrentUser);
router.get("/:id", userController.getUserById);

module.exports = router;
