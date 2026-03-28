import "dotenv/config"
import app from "./src/app.js"
const PORT = process.env.PORT

const start = async () => {
    // Connection to databse
    app.listen(PORT, () => {
        console.log(`Server is running on ${PORT} in ${process.env.NODE_ENV} mode`)
    })
}

start().catch((err) => {
    console.error("Failed to start server");
    process.exit(1)
})




