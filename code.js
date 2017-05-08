/*
52 cards
Ace can be 1 or 11 in value.
Picture cards are worth 10


Start game
Player gets 2 random cards from pack
Dealer gets one, the player can see

Player can hit or stick
(Stick means choose to stop if happy with value)
Or if sum value is over 21.

If player sticks, then dealer starts to 
draw cards from the pack, drawing closer to 21.

If the dealer goes over the player wins

LOSE - Player loses if value is over 21

*/
//Globals
var playerCards = [];
var playerTotal;
var dealerCards = [];
var dealerTotal;
var currentPackOfCards = packOfCards;

function startGame() {
		
	//Take 2 random cards from the pack and give to player
	takeARandomCardFromThePack(playerCards);
	takeARandomCardFromThePack(playerCards);

	//Take 1 random card from the pack and give to dealer
	takeARandomCardFromThePack(dealerCards);

	//console.log('playerCards', playerCards);
	//console.log('dealerCards', dealerCards);

	//console.log(currentPackOfCards.length);
	playerTotal = getTotalValueOfCards(playerCards);
	dealerTotal = getTotalValueOfCards(dealerCards);
	
	getGameState("Still Playing");
	
	

	//console.log('Total Player',getTotalValueOfCards(playerCards));

}

function takeARandomCardFromThePack(cardsInHand) {
	//Random index of array represents a card selected within the pack
	var randomlySelectedCardIndex = Math.floor((currentPackOfCards.length - 1) * Math.random());
	
	//Pull out randomly selected card and give to the player/dealer, 
	//pushing to 'playerCards' or 'dealerCards' array - reference - 'cardsInHand' parameter (Array type)
	card = currentPackOfCards[randomlySelectedCardIndex];
	cardsInHand.push(card)	
	
	//Remove randomly selected card from the pack
	currentPackOfCards = currentPackOfCards.filter((card, i) => {
		return i !== randomlySelectedCardIndex;
	});

	return currentPackOfCards;
}

function getTotalValueOfCards(cards) {

	let total = 0;

	cards.map(card => {
		//If Ace, check current total value then assign
	  //value of 1 or 11 depending on if 11 take total
	  //value over 21
		if(card.card === 'Ace') {
			if(total + 11 >= 21) {
				total += 11;
			} else {
				total += 1;
			}
		}
		//If card.card is either Queen, Jack or King
	  //then assign value of 10
		if(typeof card.card === 'string' && card.card !== 'Ace') {
			total += 10;
		}

		if(typeof card.card === 'number') {
			total += card.card;
		}
	})

	return total;	
}

function displayCards(side, total, status) {
	var newDiv = document.createElement("div");
	var newSide = document.createTextNode(side);
	var newTotal = document.createTextNode(total);
	var newStatus = document.createTextNode(status);
	newDiv.appendChild(newSide);
	newDiv.appendChild(newTotal);
	newDiv.appendChild(newStatus);
	var currentDiv = document.getElementById("container"); 
  document.body.insertBefore(newDiv, currentDiv); 
}

function getGameState(status) {


		displayCards("Player", playerTotal, status);
		displayCards("Dealer", dealerTotal, status);
	

	
}

function hit() {
	takeARandomCardFromThePack(playerCards);
	playerTotal = getTotalValueOfCards(playerCards);
	dealerTotal = getTotalValueOfCards(dealerCards);
	var gameStatus = "Still playing..."
	
	console.log(playerTotal, playerCards);
	if(playerTotal > 21) {
		gameStatus = "You Lose!";
	}

	getGameState(gameStatus);
}

	


function stick() {
	var gameStatus = "Still playing..."
	takeARandomCardFromThePack(dealerCards);
	dealerTotal = getTotalValueOfCards(dealerCards);
	//Compare playerTotal with dealerTotal
	//If dealerTotal is > playerTotal and <= 21, player loses game

	if(dealerTotal > playerTotal && dealerTotal <= 21) {
		gameStatus = "You Lose!";
	}

	//If dealerTotal > 21 player wins
	if(dealerTotal > 21) {
		gameStatus = "You Win!"
	}

	getGameState(gameStatus);
}