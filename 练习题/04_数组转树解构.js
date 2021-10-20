let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]


function arrToTree(arr, id) {
  let res = []
  arr.forEach(item => {
    if(item.pid === id) {
      let itemChildren = arrToTree(arr, item.id)
      if(itemChildren.length) {
        item.children = itemChildren
      }
    }
    res.push(item)
  })
  return res
}

console.log(arrToTree(arr,0))