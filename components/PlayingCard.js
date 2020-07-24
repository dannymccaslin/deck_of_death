import React ,{useContext} from 'react';
 
import CardImage from "./CardImage";
import SettingsContext from '../context/SettingsContext';


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
        return parseInt(appSettings.settings.jokerReps);
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
export default PlayingCard;
