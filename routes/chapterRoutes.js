const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../middleware/authMiddleware");
const chapterController = require("../controllers/chapterController");
const lessonController = require("../controllers/lessonController");
// admin, teacher tạo chương
router.post(
  "/",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.createChapter,
);

// admin, teacher cập nhật chương
router.put(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.updateChapter,
);

// admin, teacher xóa chương
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.deleteChapter,
);

// lấy tất cả bài học trong chương
router.get("/:chapterId/lessons", lessonController.getLessonsByChapter);
module.exports = router;
