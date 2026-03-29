import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../auth/utils/token.js";

export function authenticationMiddleware() {
    return function(req: Request, res: Response, next: NextFunction) {
        const header = req.headers['authorization']
        if (!header) next();
        if (!header?.startsWith('Bearer')) {
            return res.status(400).json({ error: 'authorization must start with Bearer' })
        }
        const token = header.split(" ")[1]
        if (!token) return res.status(400).json({ error: 'authorization must start with Bearer' })
        const user = verifyToken(token)
        req.user = user
        next()
    }
}
export function restrictToAuthenticatedUser() {
    return function(req: Request, res: Response, next: NextFunction) {
        if (!req.user)
            return res.status(400).json({
                error: "authentication Required"
            })
        return next()
    }
}
