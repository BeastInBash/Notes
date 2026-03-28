import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DATABASE_URI);
        console.log("MongoDB connected", conn.connection.host)

    } catch (error) {
        console.error("Failed to connect to database! Database so rha hai lunch ke baad ana")
    }
}
export default connectDB;
