/*
浅拷贝是创建一个新的对象，这个对象有着原始对象的属性值
  如果这个属性是基本类型（undefined, boolean, string, number, object， symbel）的值
  如果这个属性是引用类型，拷贝的书内存地址，如果其中一个对象改变了，会影响到另外的一个对象
*/

var a1 = {test:1, b: { c: {} } };

// shallowClone 浅拷贝的方法
var a2 = shallowClone(a1);

console.log(a2);

console.log(a2.b.c === a1.b.c); // true 共用一块内存
a2.b.c = "123";
a2.test = 2
console.log(a1);
console.log(a2);

console.log(a2.b.c === a1.b.c);

function shallowClone(source) {
  var target = {};
  for (var i in source) {
    if (source.hasOwnProperty(i)) {
      // hasOwnProperty判断source是否含自身 i
      target[i] = source[i];
    }
  }
  return target;
}

// Object.assign()
// 方法可以把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象

let obj1 = { person: { name: "kobe", age: 41 }, sports: "basketball" };
let obj2 = Object.assign({}, obj1);
obj2.person.name = "wade";
obj2.sports = "football";
console.log(obj1); // { person: { name: 'wade', age: 41 }, sports: 'basketball' }

//展开运算符...
let obj1 = { name: "Kobe", address: { x: 100, y: 100 } };
let obj2 = { ...obj1 };
obj1.address.x = 200;
obj1.name = "wade";
console.log("obj2", obj2); // obj2 { name: 'Kobe', address: { x: 200, y: 100 } }

// Array.prototype.concat()
let arr = [
  1,
  3,
  {
    username: "kobe",
  },
];
let arr2 = arr.concat();
arr2[2].username = "wade";
console.log(arr); //[ 1, 3, { username: 'wade' } ]
