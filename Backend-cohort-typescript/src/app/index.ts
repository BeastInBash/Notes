import express from 'express'
import { authRouter } from './auth/routes.js'
export function createApplication() {
    const app = express()
    // Middlewares
    app.use(express.json())

    // Routes
    app.get('/', (req, res) => {
        return res.json({ message: 'Welcome to ChaiCode Auth Service' })
    })
    app.use('/auth', authRouter)
    return app
}
