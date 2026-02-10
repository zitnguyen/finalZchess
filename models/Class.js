const mongoose = require("mongoose");

const classSchema = new mongoose.Schema(
  {
    classId: {
      type: String,
      required: true,
      unique: true,
      default: () => `CL-${Date.now()}`,
    },

    className: {
      type: String,
      required: true,
    }, //tên lớp học

    description: String,
    fee: Number, //học phí
    level: String,
    maxStudents: Number,
    totalSessions: { type: Number, default: 16 }, //tổng số buổi học
    durationWeeks: Number, //thời lượng khóa học (số tuần)

    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      default: null,
    },

    startDate: {
      type: Date,
    },

    schedule: {
      type: String,
    },

    currentStudents: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ["Pending", "Active", "Finished"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Class", classSchema);
