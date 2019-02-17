$.ajax({
	url : "data/grammys.json",
	type : "GET",
	dataType : "json",
	success: function(data){
		console.log(data.fields[0].field);
		var idToSearch = 0;
		let new_html = "";
		for(let i = 0; i < data.fields.length; i++){
			new_html += `
			<option value="${data.fields[i].field_id}">
			${data.fields[i].field}
			</option>
			`;
		}

		$("#category_types").append(new_html);
		$("#category_types").on('change', function(event){
			let id = $("#category_types").val();
			$("#category_list").empty();
			completeCategories(data.fields[id-1].categories);
			$("#field_title").text(data.fields[id-1].field);
			if (data.fields[id-1].hasOwnProperty("description")){
				$("#description").text(data.fields[id-1].description);
			} else {
				$("#description").text("");
			}
		});


	},
	error: function(error_msg){
		console.log(error_msg);
	}
});

function completeCategories(categories){	
	let new_html = "";
	for (let i = 0; i < categories.length; i++){
		new_html+= `
		<h3 value="${categories[i].category_id}">
		${categories[i].category_name}
		</h3>
		`;
		let nominees = categories[i].nominees;
		for(let j = 0; j < nominees.length; j++){
			if(j == categories[i].winner_id){
				new_html+=`<li><h4  class="winner">${nominees[j].nominee}</h4> <span> WINNER! </span></li>`
			}else{
				new_html+=`<li><h4>${nominees[j].nominee}</h4></li>`
			}
			new_html+=`<p> ${nominees[j].artist} </p>`
			new_html+=`<p> ${nominees[j].info} </p>`
		}
	}
	$("#category_list").append(new_html);
	
}

