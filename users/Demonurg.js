exports.nextBigger = function nextBigger(num) {
  const digits = num.toString().split('').map(i => parseInt(i));

  let foundSmallerNumberIndex = -1;
  let foundBiggerNumberIndex = -1;
  let i;
  let prevSearchedNumbers = new Set([0]);

  for (i = digits.length - 1; i > foundSmallerNumberIndex; i--) {
    if (digits[i] > 0 && !prevSearchedNumbers.has(digits[i])) {
      for (let j = i - 1; j > foundSmallerNumberIndex; j--) {
        if (digits[i] > digits[j]) {
          foundSmallerNumberIndex = j;
          foundBiggerNumberIndex = i;
          prevSearchedNumbers.add(digits[i]);
        }
      }
    }
  }

  
  if (foundSmallerNumberIndex > -1) {
    [digits[foundSmallerNumberIndex], digits[foundBiggerNumberIndex]] = [digits[foundBiggerNumberIndex], digits[foundSmallerNumberIndex]];
    let head = digits.slice(0, foundSmallerNumberIndex + 1);
    let tail = digits.slice(foundSmallerNumberIndex + 1);
    let sortedTail = tail.sort((a, b) => (a < b) ? -1 : ((a > b) ? 1 : 0));

    return parseInt([...head, ...sortedTail].join(''), 10);
  }


  return -1;
}