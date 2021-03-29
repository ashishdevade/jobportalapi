 module.exports.get_formatted_date = function(selected_date, format, delimeter){
 	let d = new Date(selected_date);
 	let mm = ("0" + (d.getMonth() + 1)).slice(-2);
 	let dd = ("0" + d.getDate()).slice(-2);
 	let yy = d.getFullYear();
 	let date_str = '';
 	if(format == 1){
 		date_str = yy + delimeter + mm + delimeter + dd;
 	} else if(format == 2){
 		date_str =  dd + delimeter + mm + delimeter + yy;
 	} 
 	
 	return date_str;
 }