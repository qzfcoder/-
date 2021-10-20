function fbn(n){
  if(n<0) throw new Error('输入的数字不能小于0')
  if(n<2) return n
  return fbn(n-1) + fbn(n-2)
}
console.log(fbn(10))