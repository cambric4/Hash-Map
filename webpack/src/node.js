export class Node {
    constructor (value = null, data = null) {
        this.data = data
        this.value = value
        this.next = null
    }
    toString () {
        return `(${this.data ? `${this.value}: ${this.data}` : this.value}) => ${this.next ? this.next.toString() : 'null'}`
    }
}