import { Response } from "express";

class ApiResponse {
    static ok(res: Response, message: string, data = null) {
        return res.status(200).json({
            sucess: true,
            message,
            data
        })
    }
    static created(res: Response, message: string, data = null) {
        return res.status(201).json({
            success: true,
            message,
            data
        })
    }
}
export default ApiResponse
