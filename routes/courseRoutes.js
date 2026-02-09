const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const { protect, authorize } = require("../middleware/authMiddleware");

// Public
router.get("/", courseController.getAllCourses);
router.get("/:slug", courseController.getCourseBySlug);

//Admin,teacher tạo khóa học
router.post(
  "/",
  protect,
  authorize("Admin", "Teacher"),
  courseController.createCourse,
);
//admin,teacher cập nhật khóa học
router.put(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  courseController.updateCourse,
);
//admin,teacher xóa khóa học
router.delete(
  "/:id",
  protect,
  authorize("Admin", "Teacher"),
  courseController.deleteCourse,
);
module.exports = router;
