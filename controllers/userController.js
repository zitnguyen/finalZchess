const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.getMe = async (req, res) => {
  const user = await User.findById(req.user.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.json(user);
};
//tao user cua admin
exports.createUser = async (req, res) => {
  try {
    const { username, password, role, teacherInfo } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "Thiếu username hoặc password" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "Người dùng đã tồn tại" });
    }

    const user = await User.create({
      username,
      password,
      role: role || "Parent",
      teacherInfo: role === "Teacher" ? teacherInfo : undefined,
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      role: user.role,
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
// Lấy tất cả người dùng
exports.getAllUsers = async (req, res) => {
  const filter = {};
  if (req.query.role) filter.role = req.query.role;

  const users = await User.find(filter).select("-password");
  res.json(users);
};
// Lấy người dùng theo ID
exports.getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.json(user);
};
// Cập nhật người dùng
exports.updateUser = async (req, res) => {
  const { password, ...updateData } = req.body;

  if (password && password.trim() !== "") {
    const salt = await bcrypt.genSalt(10);
    updateData.password = await bcrypt.hash(password, salt);
  }

  const user = await User.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }

  res.json(user);
};
//xóa người dùng
exports.deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) {
    return res.status(404).json({ message: "Không tìm thấy người dùng" });
  }
  res.json({ message: "Đã xóa người dùng" });
};
// Lấy tất cả giáo viên
exports.getTeachers = async (req, res) => {
  const teachers = await User.find({ role: "Teacher" }).select("-password");
  res.json(teachers);
};
