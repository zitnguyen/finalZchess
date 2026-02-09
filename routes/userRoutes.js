const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { protect, authorize } = require("../middleware/authMiddleware");

router.get("/me", protect, userController.getMe);
router.get(
  "/teachers",
  protect,
  authorize("Admin"),
  userController.getTeachers,
);

// Admin routes (quản lý người dùng)
router.post(
  "/register",
  protect,
  authorize("Admin"),
  userController.createUser,
);
router.get("/", protect, authorize("Admin"), userController.getAllUsers);
router.get("/:id", protect, authorize("Admin"), userController.getUserById);
router.put("/:id", protect, authorize("Admin"), userController.updateUser);
router.delete("/:id", protect, authorize("Admin"), userController.deleteUser);

module.exports = router;
