import { createServer } from "node:http"
import { createApplication } from "./app/index.js"
async function main() {
    try {
        const server = createServer(createApplication())
        const PORT: number = 3000
        server.listen(PORT, () => {
            console.log("Working on port", PORT)
        })
    } catch (error) {
        console.log("Error Starting")
        throw error
    }
}
main()
