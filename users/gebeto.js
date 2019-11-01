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


exports.nextBigger = function nextBigger(number) {
  const arr = number.toString().split("");
  for (let i = arr.length - 1; i > 0; i--) {
    if (arr[i-1] < arr[i]) {
      for (let j = arr.length - 1; j > i-1; j--) {
        if (arr[j] < arr[j-1]) continue;
        var tmp = arr[j];
        arr[j] = arr[j - 1];
        arr[j - 1] = tmp;
      }
      return parseInt(arr.join(""))
    }
  }
  return -1;
}

console.log(nextBigger(11173714351))