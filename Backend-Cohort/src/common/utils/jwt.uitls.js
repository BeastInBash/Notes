import crypto from 'crypto'
import jwt from 'jsonwebtoken'

export const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString("hex")
    const hashedToken = crypto.createHash("sha256").update(rawToken).digest("hex")
    return { rawToken, hashedToken }
}
export const generatePasswordHash = async (password) => {
    const hashedPassword = crypto.createHash("sha-256").update(password).digest("hex")
    return hashedPassword
}

// Generate hash
export const generateHash = async (value) => {
    const hashedData = crypto.createHash("sha256").update(value).digest("hex")
    return hashedData
}


// Generate Access token
export const generateToken = (payload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN || "15m"
    })
    return accessToken
}
// verifyAccessToken
export const verifyAccessToken = (token) => {
    const isVerifiedAccessToken = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
    return isVerifiedAccessToken
}
// Generate refreshToken
export const generateRefreshToken = (payload) => {
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN || "7d"
    })
    return refreshToken
}

// Create Verification refreshToken
export const verifyRefreshToken = (token) => {
    const isVerifiedRefreshToken = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
    return isVerifiedRefreshToken
}
