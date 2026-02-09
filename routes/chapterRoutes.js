const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

//admin,teacher tạo chương
router.post(
  "/",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.createChapter,
);
//admin,teacher cập nhật chương
router.put(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.updateChapter,
);
//admin,teacher xóa chương
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  chapterController.deleteChapter,
);
router.get("/course/:courseId", chapterController.getChaptersByCourse); //lấy chương theo khóa học

module.exports = router;
