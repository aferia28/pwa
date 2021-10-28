(function(){

	createDB = () => {
		
		const dbconnect = self.indexedDB.open('bbva-db', 1);
		    dbconnect.onupgradeneeded = ev => {
		    	const db = ev.target.result;
		    	const store = db.createObjectStore('Score', { keyPath: 'id', autoIncrement: true });
		    	store.createIndex('userName', 'userName', { unique: false });
		    }

		console.log('BBVA-DB created successfully');
	};

	readDB = async () => {

		const dbconnect = self.indexedDB.open('bbva-db', 1);

	  	dbconnect.onsuccess = evt => {
			const db = evt.target.result;

			var transaction = db.transaction(["Score"]);
		    var objectStore = transaction.objectStore("Score");
		    var request = objectStore.getAll();

		    request.onerror = function(evt) {
		      console.log("¡Request failed!");
		    }
		    request.onsuccess = function(evt) {
		    	if (request.result) {
		        	let readDBSuccess = new CustomEvent('read-db-onsuccess', { detail: request.result});
		        	window.dispatchEvent(readDBSuccess);
		      	} else {
		        	console.log("¡There's no data available!");
		    	}
		    };
	 	};
	}

	addDataToIndexedDB = (data) => {

		const dbconnect = self.indexedDB.open('bbva-db', 1);

		dbconnect.onsuccess = evt => {
			const db = evt.target.result;
			const transaction = db.transaction('Score', 'readwrite');
			const objectStore = transaction.objectStore('Score');
			
			objectStore.add(data)
			
			transaction.onerror = evt => {
				console.error('ERROR:', evt.target.error.message);
			};

			transaction.oncomplete = evt => {
				console.log('¡Data saved successfully!');
				const objectStore = db.transaction('Score', 'readonly').objectStore('Score');
				const query = objectStore.openCursor()
				query.onerror = evt => {
					console.error('Request failed:', evt.target.error.message);
				};

				query.onsuccess = evt => {
					const cursor = evt.target.result;
					if (cursor) {
						cursor.continue();
					} else {
						console.log('There is no more data available');
					}
				};
			};
		};
	}

})();