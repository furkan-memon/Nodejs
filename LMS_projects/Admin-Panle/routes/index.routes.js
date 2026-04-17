import express from 'express'
import { dashboard , loginPage , loginUser , loginWithAdmin , profilePage , changePassword , changePasswordPage , verifyOTP , verifyOtpPage , forgotPasswordPage , resetPassword , resetPasswordPage , generateOTP } from '../controller/auth.controller.js'

const indexRoutes = express.Router()

indexRoutes.get("/" , loginPage)
indexRoutes.post("/login" , loginUser)
indexRoutes.post("/profile" , profilePage)
indexRoutes.post("/change-password" , changePassword)
indexRoutes.get("/change-password" , changePasswordPage)


indexRoutes.get("/forgot-password" , forgotPasswordPage)
indexRoutes.post("/send-otp" , generateOTP)
indexRoutes.post("/verify-otp" , verifyOTP)
indexRoutes.get("/verify-otp" , verifyOtpPage)
indexRoutes.get("/reset-password" , resetPasswordPage)
indexRoutes.post("/reset-password" , resetPassword)

indexRoutes.get("/dashboard" , dashboard)

indexRoutes.use("/admin" , import ('./admin.routes.js'))

export default indexRoutes