(function(){

  const playButton = document.getElementById("play-button");
  const nickNameInput = document.getElementById("nickname-input");
  

  playButton.addEventListener("click", function(evt) {
      evt.preventDefault();

      let nickName = nickNameInput.value;

      const dbconnect = self.indexedDB.open('bbva-db', 1);

      dbconnect.onsuccess = ev => {
        const db = ev.target.result;

        var transaction = db.transaction(["Score"]);
        var objectStore = transaction.objectStore("Score");
        var request = objectStore.getAll();

        request.onerror = function(evt) {
          console.log("¡Request failed!");
        }
        request.onsuccess = function(evt) {
          if (request.result) {
              
              if(request.result.length == 0){
                addDataToIndexedDB({
                  'userName': nickName,
                  'userScore': 0,
                  'computerScore': 0
                })
              }
              window.location.href = '/play?userName='+nickName;

            } else {
              console.log("¡There's no data available!");
          }
        };
      };
  });

  window.onload = () => {
    "use strict";

    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./../sw.js");
    }

    createDB();

  };

})()
