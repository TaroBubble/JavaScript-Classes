class HashTable {
  constructor(size = 53) {
    this.dict = new Array(size);
  }

  hash(key) {
    let total = 0;
    let prime = 31;
    for (let i = 0; i < Math.min(key.length, 100); i++) {
      let char = key[i];
      let val = char.charCodeAt(0) - 96;
      total = (total * prime + val) % this.dict.length;
    }
    return total;
  }

  set(key, value) {
    let index = this.hash(key);
    if (!this.dict[index]) this.dict[index] = [];

    this.dict[index].push([key, value]);
  }
  //hash the key and get the corresponding value
  get(key) {
    let index = this.hash(key);
    if (this.dict[index]) {
      for (let i = 0; i < this.dict[index].length; i++) {
        if (this.dict[index][i][0] === key) return this.dict[index][i][1];
      }
    }
    return undefined;
  }

  getKeys() {
    let res = [];
    if (this.dict) {
      for (let i = 0; i < this.dict.length; i++) {
        if (this.dict[i]) {
          for (let j = 0; j < this.dict[i].length; j++) {
            if (!res.includes(this.dict[i][j][0])) res.push(this.dict[i][j][0]);
          }
        }
      }
    }
    return res;
  }

  getValues() {
    let res = [];
    if (this.dict) {
      for (let i = 0; i < this.dict.length; i++) {
        if (this.dict[i]) {
          for (let j = 0; j < this.dict[i].length; j++) {
            if (!res.includes(this.dict[i][j][1])) res.push(this.dict[i][j][1]);
          }
        }
      }
    }
    return res;
  }

  print() {
    if (this.dict) {
      for (let i = 0; i < this.dict.length; i++) {
        if (this.dict[i]) console.log(this.dict[i]);
      }
    }
    return undefined;
  }
}

let hashTable = new HashTable(17);
hashTable.set("maroon", "#800000");
hashTable.set("yellow", "#FFFF00");
hashTable.set("olive", "#808000");
hashTable.set("salmon", "#FA8072");
hashTable.set("lightcoral", "#F08080");
hashTable.set("mediumvioletred", "#C71585");
hashTable.set("plum", "#DDA0DD");
hashTable.set("plum", "idk");
hashTable.set("violet", "#DDA0DD");
hashTable.set("violet", "#DDA0DD");
console.log(hashTable.getValues());
console.log(hashTable.getKeys());

hashTable.getKeys().forEach(function (key) {
  console.log(hashTable.get(key));
});
