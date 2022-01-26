// 给定一个整数数组，和一个整数目标值，请你在该数组中找出和为目标值的两个整数

nums = [2, 7, 11, 15]
target = 9

var num2 = function(nums, target) {
  map = new Map()
  for(var i = 0; i<nums.length; i++){
    x = target - nums[i]
    if(map.has(x)) {
      return [map.get(x), i]
    }
    map.set(nums[i], i)
  }
}
// （1）get() 方法用来获取一个 Map 对象中指定的元素。
// （2）set() 方法为Map对象添加一个指定键（key）和值（value）的新元素。
// （3）has() 返回一个bool值，用来表明map 中是否存在指定元素。


const myPromise = Promise.resolve(Promise.resolve("Promise!"));

function funcOne() {
	myPromise.then(res => res).then(res => console.log(res));
	setTimeout(() => console.log("Timeout!"), 0);
	console.log("Last line!");
}

async function funcTwo() {
	const res = await myPromise;
	console.log(await res,'z');
	setTimeout(() => console.log("Timeout!1"), 0)
	console.log("Last line!");
}

funcOne();
funcTwo();