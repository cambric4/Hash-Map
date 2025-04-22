import { Bucket } from './bucket.js'

export class HashMap {
  loadFactor = 0.75
  capacity = 16
  #buckets = 0
  #array = []

  hash (key, capacity) {
    let index = 0

    const primeNumber = 31
    for (let i = 0; i < key.length; i++) {
      index = (primeNumber * index + key.charCodeAt(i)) % capacity
    }

    return index
  }

  set (key, value) {
    const index = this.hash(key, this.capacity)
    // Logic for when having to expand (by doubling our array size)
    if (this.length() + 1 > this.capacity * this.loadFactor) {
        this.#resize();
      }
    /*
     Handle Collision first, check weather the bucket has our key
      (two keys can have same hashcode)
    */
    if (this.#array[index]) {
      this.#array[index].set(key, value)
      return
    }

    // Add key to the bucket
    const bucket = new Bucket()
    bucket.set(key, value)
    this.#array[index] = bucket
    this.#buckets++
  }
  #resize() {
    const oldArray = this.#array;
    this.capacity *= 2;
    this.#array = [];
    this.#buckets = 0;
  
    oldArray.forEach(bucket => {
      if (!(bucket instanceof Bucket)) return;
      bucket.list.getAllNodes().forEach(node => {
        this.set(node.value, node.data);
      });
    });
  }
  
  get (key) {
    // return value or false
    const index = this.hash(key, this.capacity)
    const bucket = this.#array[index]
    if (!bucket) return false
    return bucket.get(key).data
  }

  has (key) {
    // return in the map (true) or (false)
    const index = this.hash(key, this.capacity)
    const bucket = this.#array[index]
    return bucket ? !!bucket.get(key) : false;
  }

  remove (key) {
    // return true (successful removal) or false (has(key): false)
    const index = this.hash(key, this.capacity)
    const bucket = this.#array[index]
    if (!bucket) return false

    bucket.remove(key)
    if (!bucket.list.size) { this.#array[index] = null; this.#buckets-- }
    return true
  }

  length () {
    let length = 0
    this.#array.forEach(bucket => {
      if (!(bucket instanceof Bucket)) return
      length += bucket.list.size
    })
    return length
  }

  clear () {
    this.capacity = 16
    this.#buckets = 0
    this.#array = []
  }

  keys () {
    const array = []
    this.#array.forEach(bucket => {
      if (!(bucket instanceof Bucket)) return
      bucket.list.getAllNodes().map((node) => node.value).forEach(key => { array.push(key) })
    })
    return array
  }

  values () {
    const array = []
    this.#array.forEach(bucket => {
      if (!(bucket instanceof Bucket)) return
      bucket.list.getAllNodes().map((node) => node.data).forEach(value => { array.push(value) })
    })
    return array
  }

  entries () {
    const array = []
    this.#array.forEach(bucket => {
      if (!(bucket instanceof Bucket)) return
      bucket.list.getAllNodes().map((node) => [node.value, node.data]).forEach(pair => { array.push(pair) })
    })
    return array
  }
}