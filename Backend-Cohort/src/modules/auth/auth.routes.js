import { Router } from "express"
import { login, logout, me, register } from "./auth.controller.js"
import validate from "../../common/middleware/validate.middleware.js";
import RegisterDto from "./dto/register.dto.js";
import LoginDto from "./dto/login.dto.js";
import isLoggedIn from "./auth.middleware.js";
const router = Router()
router.post("/register", validate(RegisterDto), register)
router.post("/login", validate(LoginDto), login)
router.get('/logout', isLoggedIn, logout)
router.get('/me', isLoggedIn, me)
export default router;
