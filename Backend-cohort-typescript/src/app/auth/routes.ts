import { Router } from "express";
import AuthenticationController from "./controller.js";
import { authenticationMiddleware, restrictToAuthenticatedUser } from "../middleware/auth-middleware.js";

export const authRouter = Router()
const authenticationController = new AuthenticationController()

authRouter.post('/register', authenticationController.handleSignup.bind(authenticationController))
authRouter.post('/verifyEmail', authenticationController.verifyOtp.bind(authenticationController))
authRouter.post('/login', authenticationController.handleSignIn.bind(authenticationController))

authRouter.get('/me', authenticationMiddleware(), restrictToAuthenticatedUser(), authenticationController.getMe.bind(authenticationController))


