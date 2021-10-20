// 写一个 mySetInterVal(fn, a, b),
// 每次间隔 a,a+b,a+2b,...,a+nb 的时间，
// 然后写一个 myClear，停止上面的 mySetInterVal

function mySetInterVal(fn, a, b) {
  this.a = a;
  this.b = b;
  this.timer = 0;
  this.start = () => {
    this.handle = setInterval(() => {
      timer++;
      fn();
      console.log(this.a + this.timer * this.b);
    }, this.a + this.timer * b);
  };

  this.stop = () => {
    clearTimeout(this.handle);
    this.time = 0;
  };
}

function fn() {
  console.log("111");
}
var a =new mySetInterVal(fn, 1000, 3000);
// a.start();
a.stop()

