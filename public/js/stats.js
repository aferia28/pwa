(function(){
	const dataTable = document.getElementById("stats-table");

	const addDataRow = (data) => {

  		data.forEach((value, index)=>{
			let tbody = dataTable.getElementsByTagName('tbody')[0];
			let newRow = tbody.insertRow();

			let newCellid = newRow.insertCell();
			let id = document.createTextNode(value.id);
			newCellid.appendChild(id);

			let newCellUserName = newRow.insertCell();
			let username = document.createTextNode(value.userName);
			newCellUserName.appendChild(username);

			let newCelluserScore = newRow.insertCell();
			let userScore = document.createTextNode(value.userScore);
			newCelluserScore.appendChild(userScore);

			let newCellcomputerScore = newRow.insertCell();
			let computerScore = document.createTextNode(value.computerScore);
			newCellcomputerScore.appendChild(computerScore);	
		})
	}

	window.addEventListener("load", (evt) => {
		readDB();
  	});

  	window.addEventListener('read-db-onsuccess', (evt) => {
  		addDataRow(evt.detail);
  	})
})()