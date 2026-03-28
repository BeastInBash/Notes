import ApiResponse from "../../common/utils/api-response.js"
import { getMe, logoutService, loginService, refreshService, registerService } from "./auth.service.js"

export const register = async (req, res) => {
    const user = await registerService(req.body)
    // For Response
    ApiResponse.created(res, "Registration Success", user)
}

export const login = async (req, res) => {
    const loginData = await loginService(req.body);
    ApiResponse.created(res, "Login Success", loginData)

}
export const refresh = async (req, res) => {
    const refreshToken = await refreshService(req.token)
    ApiResponse.created(res, "Refresh Token Updated", refreshToken)
}


export const me = async (req, res) => {
    const user = await getMe(req.user.id)
    ApiResponse.ok(res, "User data", user)
}
export const logout = async (req, res) => {
    // Logout logic
    await authService.logoutService(req.user.id)
    // Clear cookie if any 
    ApiResponse.ok(res, "Logout success")
}
