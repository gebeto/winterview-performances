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
