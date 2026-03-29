import { z } from "zod";

const signUpPlayload = z.object({
    firstName: z.string().min(2),
    lastName: z.string().nullable().optional(),
    email: z.email(),
    password: z.string().min(6)
})
const signInPlayload = z.object({
    email: z.email(),
    password: z.string().min(6)
})
export {
    signInPlayload,
    signUpPlayload
}
