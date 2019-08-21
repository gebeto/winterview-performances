exports.short = (arr) => {
	let rezult = '';

	for(let i = 0; i < arr.length; i++){
  		for(let j = i; j < arr.length; j++){
      		if(arr[j] !== arr[j+1]-1){
      			let comma = j !== arr.length-1 ? ',' : '';
      			let dash = arr[i] == arr[i+2]-2 ? '-' : ',';
        		rezult += i !== j ? `${arr[i]}${dash}${arr[j]}${comma}` : `${arr[j]}${comma}`;
        		i = j;
        		break;
      		}   
    	}   
  	}
  return rezult;
}
