import crypto from 'node:crypto'
export const generateOtp = (): string => {
    return crypto.randomInt(100000, 1000000).toString()
}
