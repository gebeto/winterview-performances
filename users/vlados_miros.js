exports.short = function short(arrNum) {
  let start = true;
  let count = 0;
  let intervals = [];
  
  for (let i = 0, length = arrNum.length; i < length; i++) {
    if (arrNum[i+1] !== undefined && arrNum[i] - arrNum[i+1] === -1 ) {
      if (start) {
        intervals.push(arrNum[i]);
        start = false;
        count++;
      }
      continue;
    }
    if (intervals[count-1] && intervals[count-1] - arrNum[i] < -1 && !start) {
      intervals[count-1] = intervals[count-1] + '-' + arrNum[i];
    } else {
      intervals.push(arrNum[i])
      count++;
    }
    start = true;
  }
  return intervals.join(', ');
}
