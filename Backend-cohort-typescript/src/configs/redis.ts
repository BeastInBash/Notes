import { createClient } from "redis";
const redisClient = createClient({
    url: process.env.REDIS_URL || "redis://localhost:6379"
})
redisClient.on("error", (err) => {
    console.log("Redis Error : ", err)
})
export async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect()
        console.log("Redis connected SuccessFully......")
    }
}
export default redisClient;
