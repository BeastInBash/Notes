import { Request, Response } from "express";
import { signUpPlayload, signInPlayload, otpPayload } from "./model.js";
import db from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { createToken } from "./utils/token.js";
import { generateOtp } from "./utils/helpers.js";
import redisClient from "../../configs/redis.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
import { sendMail } from "../../utils/mail.js";
import { verifyEmailTemplate } from "./utils/mailTemplate.js";
class AuthenticationController {
    public async handleSignup(req: Request, res: Response) {
        console.log("Here")
        const validatedBody = signUpPlayload.safeParse(req.body)
        if (validatedBody.error) return res.status(400).json({
            message: "Body Validation  failed", error:
                validatedBody.error
        })
        const { firstName, lastName, email, password } = validatedBody.data
        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email))
        if (userEmailResult.length > 0) return res.status(400).json({
            error: "Duplicate entry", message: "user already exist"
        })
        const salt = randomBytes(32).toString('hex')
        // Append randome Salt with password to make is extra safe and unmatchable to rainbow table 
        // Creating hash
        const hash = createHmac('sha256', salt).update(password).digest('hex')
        // Insert user data to table 
        const [result] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password: hash,
            salt
        }).returning({ id: userTable.id, email: userTable.email })
        // Send mail with otp  
        const otp = generateOtp()
        sendMail({ to: email, subject: "Verify Your Email", html: verifyEmailTemplate(otp) })

        await redisClient.set(`OTP:${result?.email}`, otp, { EX: 300 })
        return res.status(201).json({ message: "User has been created", data: { id: result?.id } })
    }
    // Verify OTP
    public async verifyOtp(req: Request, res: Response) {
        const validatedBody = otpPayload.safeParse(req.body);
        console.log("Validation Error", validatedBody)
        if (validatedBody.error) throw ApiError.badRequest("OTP can only be of 6 digit")
        const { email, otp } = validatedBody.data
        const savedOtp = await redisClient.get(`OTP:${email}`)
        if (Number(otp) !== Number(savedOtp)) throw ApiError.forbidden("Invalid or Expired OTP")
        await db.update(userTable).set({ isVerified: true }).where(eq(userTable.email, email))
        return ApiResponse.ok(res, "Email Verified Successfully")

    }
    public async handleSignIn(req: Request, res: Response) {
        const validatedBody = await signInPlayload.safeParse(req.body)
        if (validatedBody.error) return res.status(400).json({
            message: "Body Validation failed",
            error: validatedBody.error.issues
        })
        const { email, password } = validatedBody.data
        const [user] = await db.select().from(userTable).where(eq(userTable.email, email));
        if (!user) return res.status(404).json({
            message: "user doesn't exist",
        })
        const passHash = createHmac('sha256', user?.salt!).update(password).digest('hex')
        if (passHash !== user?.password) return res.status(400).json({
            message: "Invalid Password or Email"
        })
        const payload = {
            id: user.id
        }
        const token = createToken(payload)
        res.status(200).json({
            success: true,
            message: "Login Success",
            data: {
                token
            }
        })

    }
    public async getMe(req: Request, res: Response) {
        const { id } = req.user!
        const [userResult] = await db.select().from(userTable).where(eq(userTable.id, id))
        return res.json({
            firstName: userResult?.firstName,
            lastName: userResult?.lastName,
            email: userResult?.email
        })


    }
}
export default AuthenticationController
