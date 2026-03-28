// import { sendVerificationEmail } from '../../common/config/mail.js'
import ApiError from '../../common/utils/api-error.js'
import { generateHash, generateRefreshToken, generateResetToken, generateToken, verifyRefreshToken } from '../../common/utils/jwt.uitls.js'
import User from './auth.model.js'
const registerService = async ({ name, email, password }) => {
    const existing = await User.findOne({ email })
    if (existing) throw ApiError.conflict("Email Already Exist")
    const { rawToken, hashedToken } = generateResetToken()
    console.log("Raw Token", rawToken)
    const user = await User.create({
        name,
        email,
        password,
        verificationToken: hashedToken
    })
    const userObj = user.toObject();
    // console.log(userObj)
    return userObj;
}

const loginService = async ({ email, password }) => {
    const user = await User.findOne({ email }).select("+password");
    if (!user) { throw ApiError.userNotFound("User not found with this email!") }
    const isValid = await user.comparePassword(password)
    if (!isValid) {
        throw ApiError.unAuthorized("Invalid email or password")
    }
    const accessToken = generateToken({ id: user._id })
    const refreshToken = generateRefreshToken({ id: user._id })
    user.refreshToken = generateHash(refreshToken);
    await user.save({ validateBeforeSave: false }); // to avoid rechecking every data in the model
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.refreshToken
    return { user: userObj, accessToken, refreshToken }
}

// Refresh Service
const refreshService = async (token) => {
    if (!token) {
        throw ApiError.unAuthorized(" Refresh Token khaaa hai ? ")
    }
    const decode = verifyRefreshToken(token);
    if (!decode) {
        throw ApiError.unAuthorized("Invalid Token")
    }
    const user = await User.findById(decode.id).select("+refreshToken")
    if (!user) throw ApiError.unAuthorized(" User not found");
    if (user.refreshToken !== generateHash(token)) {
        throw new ApiError("Invalid Refresh Token")
    }
    // Generate new Token
    const accessToken = generateToken({ id: user._id })
    const refreshToken = generateRefreshToken({ id: user._id })
    user.refreshToken = generateHash(refreshToken);
    await user.save({ validateBeforeSave: false })
    const userObj = user.toObject()
    delete userObj.refreshToken
    return { refreshToken, accessToken }

}
const forgetPasswordService = async (email) => {
    const user = await User.findOne({ email });
    if (!user) {
        throw new ApiError.userNotFound("user not found")
    }
    const { rawToken, hashedToken } = generateResetToken()
    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
    await user.save();
    // Send mail and create complete reset password
}
const resetPasswordService = async ({ resetPasswordToken, newPassword }) => {
    console.log(resetPasswordToken)
    console.log(newPassword)
    // verify the resetPassword Token
    // if matches 
    // update the password

}
const getMe = async (userId) => {
    const user = await User.findById(userId)
    if (!user) throw ApiError.userNotFound("Not found")
    console.log("User", user)
    return user
}
const logoutService = async (userId) => {
    return await User.findByIdUpdate(userId, { refreshToken: null })
}


const verifyEmail = async (token) => {
    const hashedToken = generateHash(token)
    const user = User.findOne({ verificationToken: hashedToken }).select("+verificationToken")
    // Not found api-error
    user.isVerified = true;
    user.verificationToken = undefined;
    await user.save();
    return user



}
export { registerService, verifyEmail, loginService, refreshService, forgetPasswordService, getMe, logoutService, resetPasswordService }
