const Lesson = require("../models/Lesson");
const Chapter = require("../models/Chapter");
const Course = require("../models/Course");

//tạo bài học
exports.createLesson = async (req, res) => {
  try {
    const { title, chapterId, type, content, duration, isFree, order } =
      req.body;

    //kiểm tra chương tồn tại
    const chapter = await Chapter.findById(chapterId);
    if (!chapter) {
      return res.status(404).json({ message: "Chương không tồn tại" });
    }

    const lesson = await Lesson.create({
      title,
      chapterId,
      courseId: chapter.courseId,
      type,
      content,
      duration,
      isFree,
      order,
    });
    res.status(201).json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//cập nhật bài học
exports.updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!lesson) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }

    res.json(lesson);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//xóa bài học
exports.deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findByIdAndDelete(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }
    res.json({ message: "Đã xóa bài học" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//lấy chi tiết bài học
exports.getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);
    if (!lesson) {
      return res.status(404).json({ message: "Bài học không tồn tại" });
    }
    res.json(lesson);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
