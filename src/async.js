/* const promise = new Promise((res, rej) => {
    setTimeout(() => {
        res("Hello this is new")
        rej(new Error("Error aa gya re"))
    }, [1000])
});


promise.then(console.log) // promise.then((value) => console.log(value)) both
 are same
promise.then((data) => console.log(data)).catch((error) => consol.log(error))
*/
// ========================= Await Syntax ==========================
const hPromise = new Promise((res, rej) => {
    setTimeout(() => {
        res("Ki haal Chaal ")
    }, 3000)
})

async function nice() {
    const result = await hPromise
    console.log(result)
}
nice();

const newResult = await hPromise
console.log(newResult)
