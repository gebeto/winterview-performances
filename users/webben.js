exports.nextBigger = function nextBigger(n) {
	const findNextDigit = minDigit => seq => seq.reduce((minIndex, cur, curIndex, arr) => {
		const min = minIndex === - 1 ? Infinity : arr[minIndex];
		return (minDigit < cur && cur < min) ? curIndex : minIndex;
	}, -1);

	const digits = [...String(n)].reverse();
	const minSeq = [];

	for (let digitIndex = 0; digitIndex < digits.length; digitIndex += 1) {
		const digit = digits[digitIndex];
		minSeq.push(digit);

		const nextDigitIndex = digitIndex + 1;
		const nextDigit = digits[nextDigitIndex];

		if (nextDigit < digit) {
			const swapIndex = findNextDigit(nextDigit)(minSeq);
				const swap = minSeq[swapIndex];
				minSeq[swapIndex] = nextDigit;
				minSeq.sort((a,b) => b - a);
				const rest = digits.slice(nextDigitIndex + 1);

				return +[...minSeq, swap, ...rest].reverse().join('');
			}
		}
	
	return -1;
}