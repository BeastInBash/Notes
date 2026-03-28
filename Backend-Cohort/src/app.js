// express initiation
import express from 'express'
import authRoutes from './modules/auth/auth.routes.js';
import connectDB from './common/config/db.js';
const app = express();
connectDB()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', authRoutes)
export default app;

