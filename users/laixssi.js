exports.short = arr => {
  const result = [];
  const shortArr = [];
  arr.forEach((value, index, array) => {
    if (shortArr.length === 0 || value - array[index - 1] === 1)
    //заполняем промежуточный массив последовательными эл-ми
    {
      shortArr.push(value);
    } 
    if (
      (array[index - 1] && value - array[index - 1] !== 1) ||
      index === array.length - 1
    ) //условия для переноса значений в result
    {
      if (shortArr.length <= 2) //не нужно использовать "-"
      {
        result.push(shortArr.join(","));
        if (index === array.length - 1 && value - array[index - 1] !== 1) 
           //внести уникальное значение на последней итерации
        {
          result.push(value);
        }
      } else 
       //нужно использовать "-"
      {
        shortArr.splice(1, shortArr.length - 2, "-");
        result.push(shortArr.join(""));
        shortArr.length = 0;
        shortArr.push(value);
      }
    }
  });
  return result.join(",");
};




//Найти следущее по возрастанию число из тех же цифр. 1234 -> 1243

exports.nextBigger = function nextBigger(num) {
  const arrNum = allPermutations(num);
  const mappedArrNum = arrNum
  .map(number => parseInt(number, 10))
  .filter( number => number >= num)
  .sort( (a,b) => a-b)
 
  let nextBiggerNum;
 for (let i = 0; i < mappedArrNum.length; i++) {
    if (mappedArrNum[i] === num) {
      nextBiggerNum = mappedArrNum[i + 1] ? mappedArrNum[i + 1] : -1;
      break;
    }
  };
  return nextBiggerNum;
}

function allPermutations(num) {
  const result = [];
  const stringNum = num.toString();

  if (stringNum.length === 1) return [stringNum];
  for (let i = 0; i < stringNum.length; i++) {
    const firstChar = stringNum[i];

    const remainingStr = stringNum.substr(0, i) + stringNum.substr(i + 1);

    const remainingChars = allPermutations(remainingStr);
    for (let j = 0; j < remainingChars.length; j++) {
      result.push(firstChar + remainingChars[j]);
    }
  }
  return result.filter((value, index) => result.indexOf(value) === index);
}
