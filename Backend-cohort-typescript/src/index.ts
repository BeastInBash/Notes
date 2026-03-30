import { createServer } from "node:http"
import { createApplication } from "./app/index.js"
import { connectRedis } from "./configs/redis.js"
async function main() {
    try {
        const server = createServer(createApplication())
        const PORT: number = 3000
        await connectRedis()
        server.listen(PORT, () => {

            console.log("Working on port", PORT)
        })
    } catch (error) {
        console.log("Error Starting")
        throw error
    }
}
main()
