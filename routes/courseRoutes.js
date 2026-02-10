const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const chapterController = require("../controllers/chapterController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
//lấy tất cả khóa học
router.get("/", courseController.getAllCourses);
//lấy các chương của khóa học
router.get("/:courseId/chapters", chapterController.getChaptersByCourse);
//lấy khóa học theo slug
router.get("/:slug", courseController.getCourseBySlug);

// Admin, Teacher tạo khóa học
router.post(
  "/",
  protect,
  authorize("Admin", "Teacher"),
  courseController.createCourse,
);
//Admin, Teacher cập nhật khóa học
router.put(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  courseController.updateCourse,
);
//Admin, Teacher xóa khóa học
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  courseController.deleteCourse,
);

module.exports = router;
