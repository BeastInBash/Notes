Array.prototype.getFirstChar = function() {
    let word = this[0];
    return word.charAt(0);
}
let result = ["Raj", "Rahul"].getFirstChar();
console.log("Result ", result)
String.prototype.getFirstChar = function() {
    return this.charAt(0)
}
console.log("Saif".getFirstChar())

// Personal Map 
Array.prototype.newMap = function(fn, yourArg) {
    if (this === null) {
        throw new Error(`Connot read the property of Null`)
    }
    if (typeof fn !== 'function') {
        throw new Error(`${fn} is not a function`)
    }
    const result = new Array(this.length)
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            result[i] = fn.call(yourArg, this[i], i, this);
        }
    }
    return result;
}
let num = [1, 2, 4, 5, 6, 7];
console.log("2 times", num.newMap((item) => item * 2));
// console.log(num.newMap(2));

Array.prototype.newFilter = function(fn, yourArg) {
    if (this === null) {
        throw new Error("Cannot read the property of null")
    }
    if (typeof fn !== "function") {
        throw new Error(`${fn} is not a function`)
    }

    const result =[] 
    for (let i = 0; i < this.length; i++) {
        if (i in this) {
            if( fn.call(yourArg, this[i], i, this)){
                result[i] = this[i]
            };
        }
    }
    return result;

}
console.log("Filter", num.newFilter((item) => item < 4))
