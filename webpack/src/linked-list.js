import { Node } from "./node.js";

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  append(value) {
    const newNode = new Node(value);
    this.size++;

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  prepend(value) {
    const newNode = new Node(value);
    this.size++;

    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
  }

  at(index) {
    let current = this.head;
    for (let i = 0; i < index; i++) {
      if (!current) return null;
      current = current.next;
    }
    return current;
  }

  pop() {
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      let current = this.head;
      while (current.next !== this.tail) {
        current = current.next;
      }
      current.next = null;
      this.tail = current;
    }
    this.size--;
  }

  contains(value) {
    let current = this.head;
    while (current !== null) {
      if (current.value === value) return true;
      current = current.next;
    }
    return false;
  }

  find(value) {
    let current = this.head;
    let index = 0;
    while (current !== null) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return null;
  }

  toString() {
    let current = this.head;
    let result = "";
    while (current !== null) {
      result += `( ${current.value} ) -> `;
      current = current.next;
    }
    result += "null";
    return result;
  }

  insertAt(value, index) {
    if (index === 0) return this.prepend(value);
    if (index === this.size) return this.append(value);

    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    newNode.next = current.next;
    current.next = newNode;
    this.size++;
  }

  removeAt(index) {
    if (index === 0) {
      this.head = this.head.next;
      if (this.head === null) this.tail = null;
      this.size--;
      return;
    }

    let current = this.head;
    for (let i = 0; i < index - 1; i++) {
      current = current.next;
    }
    current.next = current.next.next;
    if (!current.next) this.tail = current;
    this.size--;
  }

  appendKeyValue(key, value) {
    const newNode = new Node(key, value);
    this.size++;
  
    if (this.head === null) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }
  
  getNodeByKey(key) {
    let current = this.head;
    while (current !== null) {
      if (current.value === key) return current;
      current = current.next;
    }
    return null;
  }
  
  getAllNodes() {
    const nodes = [];
    let current = this.head;
    while (current !== null) {
      nodes.push(current);
      current = current.next;
    }
    return nodes;
  }  

  getHead() {
    return this.head;
  }

  getTail() {
    return this.tail;
  }
}

export { LinkedList };