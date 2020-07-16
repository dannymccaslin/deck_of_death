import PlayingCard from "./PlayingCard";

//Create the deck
const createDeck = () => {
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i

      // swap elements array[i] and array[j]
      // we use "destructuring assignment" syntax to achieve that
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  var suits = ["Hearts", "Spades", "Clubs", "Diamonds"];
  var faces = [
    "Ace",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "Jack",
    "Queen",
    "King",
  ];
  const deck = [];
  for (var c = 0; c < appSettings.settings.numberOfDecks; c++) {
    for (var i = 0; i < suits.length; i++) {
      for (var j = 0; j < faces.length; j++) {
        let suit = suits[i];
        let face = faces[j];
        let card = new PlayingCard(suit, face);
        deck.push(card);
      }
    }
  }
  shuffle(deck);
  return deck;
};
export default createDeck;
