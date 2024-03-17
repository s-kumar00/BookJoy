const router = require('express').Router()
const { isAuthenticated } = require('../middlewares/auth');
const authController = require("../controllers/authController")

router.post("/register", authController.register)
router.post("/login", authController.login)
router.post("/verifyToken", isAuthenticated, authController.verifyToken);
router.get("/logout/:userId", isAuthenticated, authController.logout);
router.post("/createOtp", authController.createOtp)
router.post("/verifyOtp",authController.verifyOtp)
router.post("/changePassword", authController.changePassword)
module.exports = router