const loginModel = require("../Model/loginModule");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { generateOTP } = require("../otpGenerate/sendOTP");
const sendMail = require("../otpGenerate/sendMail");
const OTP = require("../Model/otpModel");

exports.verifyToken = async (req, res) => {
  try {
    const userId = req.user._id;
    const user = await loginModel.findById({ _id: userId });
    if (!user) {
      return res.json({
        status: "failed",
        message: "User not found",
      });
    }
    delete user.password;
    res.json({
      status: "success",
      user,
    });
  } catch (error) {
    res.json({
      status: "failed",
      message: error.data,
    });
  }
};

exports.register = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await loginModel.findOne({ email: email });
    if (data) {
      res.send({ message: "Email id is already registered", alert: false });
    } else {
      const data = loginModel(req.body);
      const hash = await bcrypt.hashSync(data.password, 10);
      data.password = hash;
      data.save();
      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
      res.json({ token, message: "Successfully sign up", alert: true });
    }
  } catch (err) {
    console.log(err);
    // res.json({
    //   alert: false,
    //   message: err.data,
    // });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await loginModel.findOne({ email });
    if (!user) {
      res.send({ message: "Email not registered", alert: false });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.send({ message: "Incorrect password", alert: false });
    }
    user = user.toObject();
    delete user.password;
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({
      alert: true,
      token,
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.logout = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await loginModel.findById(userId);
    await user.save();
    res.json({
      alert: false,
      message: "Logout Successfully",
    });
  } catch (err) {
    res.json({
      alert: false,
      message: err.data,
    });
  }
};

exports.createOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await loginModel.findOne({ email });
    if (!data) {
      res.send({ message: "Email not registered", alert: false });
    }
    const createOTP = await generateOTP(email);
    //send mail to generate otp
    const mailOptions = {
      from: process.env.USER,
      to: `${email}`,
      subject: "Password Recovery Email",
      html: `<p>Otp to change the password </p><p style="color:tomato; font-size:20px; letter-spacing:2px;"><b>${createOTP}</b></p>`,
    };
    await sendMail(mailOptions);

    const hashOTP = await bcrypt.hashSync(createOTP, 10);

    const newOTP = await new OTP({
      email,
      otp: hashOTP,
      createAt: Date.now(),
      expireAt: new Date(Date.now() + 1 * 3600 * 1000),
    });
    await newOTP.save();
    res.json({
      message: "Otp send to email Successfully",
      alert: true,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const { email, otpValue } = req.body;
    if (!(email && otpValue)) {
      res.send({ message: "Plz inter Otp", alert: false });
    }

    const otp = await OTP.findOne({ email });
    if (!otp) {
      res.send({ message: "Invalid OTP", alert: false });
    }

    const { expireAt } = otp;
    if (Date.now() > expireAt) {
      await OTP.deleteOne({ email });
      res.send({ message: "OTP expired", alert: false });
    }

    const isMatch = await bcrypt.compare(otpValue, otp.otp);

    if (!isMatch) {
      res.send({ message: "Invalid OTP", alert: false });
    }
    await OTP.deleteOne({ email });
    res.json({ message: "OTP verified successfully", alert: true });
  } catch (error) {
    console.log(error);
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await loginModel.findOne({ email });
    const hashPassword = await bcrypt.hashSync(password, 10);
    user.password = hashPassword;
    user.save();
    res.json({ message: "password changed successfully", alert: true });
  } catch (error) {
    console.log(error);
  }
};
