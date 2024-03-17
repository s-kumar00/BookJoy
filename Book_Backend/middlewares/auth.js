const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const header = req.headers.authorization;
  const token = header && header.split(" ")[1];

  if (!token) {
    return res.json({
      status: "failed",
      message: "Access denied",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json({
        status: "failed",
        message: "Invalid Token",
      });
    }

    res.user = verified;
    next();
  } catch (err) {
    res.json({
      status: "failed",
      message: "Invalid token",
    });
  }
};

exports.isAuthenticated = isAuthenticated;
