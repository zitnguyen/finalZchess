const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateAccessToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_REFRESH_SECRET || "refresh_secret", {
    expiresIn: "7d",
  });
};

//sign up
exports.signup = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập username và password" });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(409).json({ message: "Username đã tồn tại" });
    }

    const user = await User.create({
      username,
      password,
      role: "Parent",
    });

    res.status(201).json({
      _id: user._id,
      username: user.username,
      message: "Đăng ký thành công",
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
//sign in
exports.signin = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Vui lòng nhập username và password" });
    }

    const user = await User.findOne({
      $or: [{ username }, { email: username }],
    });

    if (!user || !(await user.matchPassword(password))) {
      return res
        .status(401)
        .json({ message: "Sai tên đăng nhập hoặc mật khẩu" });
    }

    const accessToken = generateAccessToken(user._id);
    const refreshToken = generateRefreshToken(user._id);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({
      userId: user._id,
      accessToken,
      username: user.username,
      fullName: user.fullName || "",
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
//sign out
exports.signout = (req, res) => {
  res.clearCookie("refreshToken");
  res.json({ message: "Đăng xuất thành công" });
};
//refresh token
exports.refresh = (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: "Không tìm thấy token trong cookie" });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET || "refresh_secret",
    (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Token không hợp lệ hoặc đã hết hạn" });
      }

      const accessToken = generateAccessToken(decoded.id);
      res.json({ accessToken });
    },
  );
};
