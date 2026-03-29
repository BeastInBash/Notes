import { Request, Response } from "express";
import { signUpPlayload, signInPlayload } from "./model.js";
import db from "../../db/index.js";
import { userTable } from "../../db/schema.js";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";
import { createToken } from "./utils/token.js";
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
        }).returning({ id: userTable.id })

        return res.status(201).json({ message: "User has been created", data: { id: result?.id } })
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
