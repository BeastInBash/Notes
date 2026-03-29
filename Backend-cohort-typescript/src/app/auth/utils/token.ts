import 'dotenv/config'
import jwt from 'jsonwebtoken'

export interface USERTOKENPAYLOAD {
    id: string
}
export const createToken = (payload: USERTOKENPAYLOAD) => {
    return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export const verifyToken = (token: string): USERTOKENPAYLOAD => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET!) as USERTOKENPAYLOAD;
    } catch (error) {
        throw new Error("Invalid or expired token");
    }
};
