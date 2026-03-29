const text = "The quick Brown fox jump over the lazy dog";
const freq = new Map();
for (let word of text.split(" ").join("")) {
    let wordFreq = freq.get(word) || 0;
     freq.set(`Frequency of the word : ${word}`, wordFreq + 1)
}

console.log(freq)
