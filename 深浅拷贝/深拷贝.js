/*
深拷贝是将一个对象从内存中完整的拷贝出来一份，在堆内存中开辟出一个新的区域存放新的对象，修改新的对象不会影响到原对象
*/

var a1 = {b: {c:{}}}

// deepClone 深拷贝的方法
var a2 = deepClone(a1)

console.log(a2)

console.log(a2.b.c === a1.b.c) // false
a2.b.c = 'asd'
console.log(a1)
console.log(a2)

function deepClone(obj) {
  if(obj === null) return null
  if(obj instanceof Date) return new Date(obj) // instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上
  if(obj instanceof RegExp) return new RegExp(obj)
  if(typeof obj !== 'object') return obj
  let cloneObj = new obj.constructor()
  for(let key in obj) {
    if(obj.hasOwnProperty(key)) {
      cloneObj[key] = deepClone(obj[key])
    }
  }
  return cloneObj
}

// JSON.parse(JSON.stringify()) 实现数组或对象深拷贝,但不能处理函数和正则
let arr = [1, 3, {
  username: ' kobe'
}];
let arr4 = JSON.parse(JSON.stringify(arr));
arr4[2].username = 'duncan'; 
console.log(arr, arr4)

// 手写递归方法: 遍历对象、数组直到里边都是基本数据类型，然后再去复制，就是深度拷贝。
// WeakMap初始化参数是一个Iterable的对象， 可以是二元数组或者其他可迭代的键值对的对象。每个键值对会被加到新的 WeakMap里。
function deepClone2 (obj, hash = new WeakMap()) {
  if(obj === null ) return obj // 如果是null或者undefined 就直接返回，不进行操作
  if(obj instanceof Date) return new Date(obj)
  if(obj instanceof RegExp) return new RegExp(obj)
  if(typeof obj !== "object") return obj
  if(hash.get(obj)) return hash.get(obj)
  let cloneObj = new obj.constructor
  hash.set(obj, cloneObj)
  for(let key in obj) {
    if( obj.hasOwnProperty(key) ) {
      cloneObj[key] = deepClone(obj[key], hash)
    }
  }
  return cloneObj
}

