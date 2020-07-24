import React, {useContext} from 'react';
// import PlayingCard from "./PlayingCard";
import CardImage from "./CardImage";

import SettingsContext, { SettingsConsumer } from "../context/SettingsContext";


//Create the deck
const createDeck = () => {
  class PlayingCard {

    constructor(s, f) {
      this.suit = s;
      this.face = f;
      //Get the value pf a card (King of Hearts, etc)
      this.getValue = () => {
        return `${this.face} of ${this.suit}`;
      };
      //Get the Face Value (What the card is worth)
      this.getFaceValue = () => {
        if (this.face === "Ace") {
          return parseInt(appSettings.settings.aceValue);
        } else if (
          this.face === "King" ||
          this.face === "Queen" ||
          this.face === "Jack" ||
          this.face === "10"
        ) {
          return 10;
        } else if (this.face === "Joker") {
          return appSettings.settings.jokersReps;
        } else {
          return parseInt(this.face);
        }
      };
      //Get the suit to match up with the workouts (Spades = Push Ups, etc)
      this.getSuit = () => {
        return this.suit;
      };
      //Transform card names into the names of the PNG files
      this.getLink = () => {
        let fiv = "";
        let fis = '';
        if (this.face === "10") {
          fiv = "10";
        } else if (this.face === "Joker") { 
          fiv = 'J';
          fis = 'J'; 
        } else {
          fiv = this.face[0];
        }
         fis = this.suit[0];
        const key = fiv + fis;
        return CardImage[key];
      };
    }
  }
  
    const appSettings = useContext(SettingsContext);

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
  if (appSettings.settings.useJokers) {
    for (let k = 0; k <(appSettings.settings.numberOfDecks * 2); k++) {
      deck.push(new PlayingCard('Joker','Joker'));
    };
  };
  shuffle(deck);
  return deck;
};
export default createDeck;
