exports.short = function short(data) {
  return data.map((el, idx, arr) => arr[idx-1] === el-1 && arr[idx + 1] === el + 1 ? '-' : el).filter((el, idx, arr) => el !== arr[idx + 1]).join().replace(/,-,/g, '-');
}
