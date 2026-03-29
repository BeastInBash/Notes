class Cricketer {
    constructor(name, role) {
        this.name = name
        this.role = role
        this.matchPlayed = 0
        this.stats = 100
    }
    introduce() {
        return `${this.name} the ${this.role} | matchPlayed ${this.matchPlayed}
        | stats: ${this.stats}`
    }
}
// const player1 = new Cricketer("Saif", "All Rounded")
// const res = player1.introduce()
// console.log( res )
// console.log(`The typeof ${typeof Cricketer}`)


//NOTE: ===================>   Promises in Javascript <==================




