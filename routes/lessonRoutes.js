const express = require("express");
const router = express.Router();
const lessonController = require("../controllers/lessonController");
const { protect, authorize } = require("../middleware/authMiddleware");

//admin,teacher tạo bài học
router.post(
  "/",
  protect,
  authorize("Admin", "Teacher"),
  lessonController.createLesson,
);
//admin,teacher cập nhật bài học
router.put(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  lessonController.updateLesson,
);
//admin,teacher xóa bài học
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  lessonController.deleteLesson,
);
router.get("/:id", lessonController.getLessonById);

module.exports = router;
