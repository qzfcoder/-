// 给定一个字符串，找出不含有重复字符的最长子串

s = 'asdsajdhkwbejkhadfioqwnm'
function getasd(s) {
    let len = s.length
    let result = 0
    for(let i = 0; i<len; i++) {
        let set = new Set()
        let maxLen = 0;
        let j = i
        while(j<len && !set.has(s[j])){
            set.add(s[j])
            maxLen++
            j++
        }
        result = Math.max(result, maxLen) // Math.max比较两个数的大小，返回大的那个
    }
    return result
}