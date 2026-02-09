const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  title: { type: String, required: true, trim: true }, //tên chương
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  order: { type: Number, default: 0 }, //số thứ tự chương
  createdAt: { type: Date, default: Date.now },
});

const Chapter = mongoose.model("Chapter", chapterSchema);
module.exports = Chapter;
