var getSum = function(a, b){
    // let sum;
    while(a) {
        const c = a ^ b
        a = ((a&b)<<1)
        b = c
    }
    return b
}

console.log(getSum(6,22))

// & 两个个位都似乎一的时候才是1
// ^相同为0 不同为1
// 左移运算符（<<） 向左移动右边补0
// 1 与 2传入
// 0001
// 0010
// c 就是  0011  ==== 3
// a = （1100 << 1）
// a= 1000



