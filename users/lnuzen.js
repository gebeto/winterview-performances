exports.nextBigger = function nextBigger(n){
	let arr = [...String(n)];
	for (let i = arr.length-1; i >=0; i--){
	if(arr[i]>arr[i-1]){	
		let n_arr = arr.splice(i);
		for(let j = n_arr.length-1; j>=0; j--){		
			if(arr[arr.length-1]<n_arr[j]){		 
				[arr[arr.length-1], n_arr[j]] = [n_arr[j], arr[arr.length-1]];
				break;
			}
		}
		return Number(arr.concat(n_arr.map(Number).sort((a,b)=>a-b)).join(''))
	}
	
	}
	return -1;
}