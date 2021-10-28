(function(){

	//Variables
	const params = (new URL(document.location)).searchParams;
  	const nikName = params.get("userName");
	const posibleComputerChoices = ['rock', 'paper', 'scissors'];
	const choicesValues = {
		paper: function(args){paperChoice(args)},
		rock: function(args){rockChoice(args)},
		scissors: function(args){scissorChoice(args)}
	}

	const userScoreSpan = document.getElementById("user-score"),
		  computerScoreSpan = document.getElementById("computer-score"),
		  resultContainer = document.getElementById("result-container"),
		  rockButton = document.getElementById("rock"),
		  paperButton = document.getElementById("paper"),
		  scissorsButton = document.getElementById("scissors");

	let userScore = 0,
		computerScore = 0,
		prevComputerChoice;

	//Methods
	const getComputerChoice = () => {
		let computerChoiceIdx;
	  	let computerChoice;
	  
		do {
			computerChoiceIdx = Math.floor(Math.random() * 3);
			computerChoice = posibleComputerChoices[computerChoiceIdx];
		} while (prevComputerChoice === computerChoice);
	  
	  	prevComputerChoice = posibleComputerChoices[computerChoiceIdx];

	    return posibleComputerChoices[computerChoiceIdx];
	}

	const playGame = (userChoice) => {

		let computerChoice = getComputerChoice();
		
		var elems = document.getElementsByClassName("computer-choice");

		[].forEach.call(elems, function(el) {
		    el.classList.remove("outline");
		});

		setTimeout(function(){ 
			
			document.getElementById('computer-'+computerChoice).classList.add('outline');
			choicesValues[userChoice].call(this, computerChoice);
		 }, 1000);
	}

	const paperChoice = (computerChoice) => {
		console.log('User chose paper, computer chose ' + computerChoice);
		
		if(computerChoice === 'scissors'){
			userLoses();
		}else if(computerChoice === 'rock'){
			userWins();
		}else{
			draw();
		}
	}

	const rockChoice = (computerChoice) => {
		console.log('User chose rock, computer chose ' + computerChoice);

		if(computerChoice === 'paper'){
			userLoses();
		}else if(computerChoice === 'scissors'){
			userWins();
		}else{
			draw();
		}
	}

	const scissorChoice = (computerChoice) => {
		console.log('User chose scissor, computer chose ' + computerChoice);

		if(computerChoice === 'rock'){
			userLoses();
		}else if(computerChoice === 'paper'){
			userWins();
		}else{
			draw();
		}
	}

	const userWins = () => {
		userScore++;
	    userScoreSpan.innerHTML = userScore;
	    computerScoreSpan.innerHTML = computerScore;
	    resultContainer.innerHTML = 'You win!';

	    addDataToIndexedDB({
	    	'userName': nikName,
	    	'userScore': userScore,
	    	'computerScore': computerScore
	    })
	}

	const userLoses = () => {
		computerScore++;
	    userScoreSpan.innerHTML = userScore;
	    computerScoreSpan.innerHTML = computerScore;
	    resultContainer.innerHTML = 'You lose!';

	    addDataToIndexedDB({
	    	'userName': nikName,
	    	'userScore': userScore,
	    	'computerScore': computerScore
	    })
	}

	const draw = () => {
		resultContainer.innerHTML = "Draw!";
	}

	const updateScores = (data) => {
  		data.forEach((value, index)=>{
	        if(value.userName == nikName){

	        	userScore = value.userScore;
	            computerScore = value.computerScore;

	            userScoreSpan.innerHTML = userScore;
	    		computerScoreSpan.innerHTML = computerScore;
	        }
	    })
	}


	//data bindings
	rockButton.addEventListener("click", function() {
    	playGame("rock");
  	});

  	paperButton.addEventListener("click", function() {
    	playGame("paper");
  	});

  	scissorsButton.addEventListener("click", function() {
    	playGame("scissors");
  	});

  	window.addEventListener("load", function(e) {
  		readDB();
  	});

  	window.addEventListener('read-db-onsuccess', (evt) => {
  		updateScores(evt.detail);
  	})

})()