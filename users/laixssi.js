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
