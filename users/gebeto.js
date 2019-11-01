function groupRanges(result, item, index) {
  if (!result.length) {
    result.push([item]);
    return result;
  }
  var currentRange = result[result.length - 1];
  if (!currentRange.length) {
    currentRange.push(item);
  } else if (item - currentRange[currentRange.length - 1] === 1) {
    currentRange.push(item);
  } else {
    result.push([item]);
  }
  return result;
}

function rangify(arr) {
  if (arr.length > 2) {
    return arr[0] + '-' + arr[arr.length - 1];
  } else {
    return arr.join(', ');
  }
}

exports.short = function short(arr) {
  return arr
    .reduce(groupRanges, [])
    .map(rangify)
    .join(', ');
}






// Next bigger
function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}

function bubbleSort(arr, start, end) {
  for (let i = start; i < end; i++) {
    for (let j = i; j < end; j++) {
      if (arr[i] > arr[j]) swap(arr, i, j);
    }
  }
}

function findBiggerThen(arr, biggerThen, start, end) {
  let res = start;
  for (let i = start; i < end; i++) {
    if (arr[i] > biggerThen && arr[res] > arr[i]) {
      res = i;
    }
  }
  return res;
}

exports.nextBigger = function nextBigger(number) {
  console.log(number);
  const arr = number.toString().split("");
  const arrl = arr.length;
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i-1] < arr[i]) {
      const biggerIndex = findBiggerThen(arr, arr[i-1], i, arrl);
      swap(arr, biggerIndex, i - 1);
      bubbleSort(arr, i, arrl);
      return parseInt(arr.join(""))
    }
  }
  return -1;
}
