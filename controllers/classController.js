const Class = require("../models/Class");
const Schedule = require("../models/Schedule");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");

//tạo lớp học(Admin,teacher)
exports.createClass = async (req, res) => {
  try {
    const {
      className,
      description,
      fee,
      level,
      maxStudents,
      totalSessions,
      durationWeeks,
      teacherId,
      startDate,
      schedule,
    } = req.body;
    const classId = req.body.classId || Date.now();

    const newClass = await Class.create({
      classId,
      className,
      description,
      fee,
      level,
      maxStudents,
      totalSessions,
      durationWeeks,
      teacherId,
      startDate,
      schedule,
      status: "Pending",
    });

    res.status(201).json(newClass);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//lấy tất cả lớp học với filter
exports.getAllClasses = async (req, res) => {
  try {
    const { teacherId, status, keyword } = req.query;
    const filter = {};

    if (teacherId) filter.teacherId = teacherId;
    if (status) filter.status = status;
    if (keyword) {
      filter.className = { $regex: keyword, $options: "i" };
    }

    const classes = await Class.find(filter)
      .populate("teacherId", "fullName email phone")
      .sort("-createdAt");

    res.json(classes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//lấy chi tiết lớp học theo id
exports.getClassById = async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id).populate(
      "teacherId",
      "fullName email",
    );

    if (!classItem) {
      return res.status(404).json({ message: "Lớp học không tồn tại" });
    }

    res.json(classItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//cập nhật lớp học
exports.updateClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!classItem) {
      return res.status(404).json({ message: "Lớp học không tồn tại" });
    }

    res.json(classItem);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

//xóa lớp học
exports.deleteClass = async (req, res) => {
  try {
    const classItem = await Class.findByIdAndDelete(req.params.id);
    if (!classItem) {
      return res.status(404).json({ message: "Lớp học không tồn tại" });
    }
    res.json({ message: "Đã xóa lớp học" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
