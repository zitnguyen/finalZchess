const mongoose = require("mongoose");

const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, //tên bài học
  chapterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  }, // Denormalized for easier queries
  type: {
    type: String,
    enum: ["video", "text", "quiz"],
    default: "video",
  }, // loại bài học
  content: { type: String }, // Video URL or text content
  duration: { type: Number, default: 0 }, //thời lượng bài học
  isFree: { type: Boolean, default: false }, //cho phép xem thử
  order: { type: Number, default: 0 }, //thứ tự bài học trong chương
  createdAt: { type: Date, default: Date.now },
});

const Lesson = mongoose.model("Lesson", lessonSchema);
module.exports = Lesson;
