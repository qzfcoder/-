var lengthOfLongestSubstring = function (s) {
  let map = new Map();
  let i = -1;
  let res = 0;
  let n = s.length;
  for (let j = 0; j < n; j++) {
    if (map.has(s[j])) {
      console.log("map.get(s[j])", map.get(s[j]));
      i = Math.max(i, map.get(s[j]));
      console.log("i", i);
    }
    res = Math.max(res, j - i);
    console.log("res", res);
    map.set(s[j], j);
  }
  return res;
};

console.log(lengthOfLongestSubstring("adfafwefffdasdcx"));
